const generateToken = require("../../config/token/generateToken");
const sgMail = require("@sendgrid/mail")
const crypto = require("crypto")
const fs = require('fs')
const User = require("../../model/user/User")
const expressAsyncHandler = require("express-async-handler");
const validateMongodbID = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const blockUser = require("../../utils/blockUser");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

//Registered

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  //check user is already exits
  const userExits = await User.findOne({ email: req?.body?.email });
  if (userExits) throw new Error("User already exits");
  try {
    //Register user
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//User Login

const userLoginCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body
  const userFound = await User.findOne({ email });
  //check if password is matched 
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.admin,
      token: generateToken(userFound?._id),
      isVerified:userFound?.isAccountVerified
    });
  }
  else {
    res.status(401);
    throw new Error('Invalid Login Crediential')
  }
});


//----------------------------
//User 
//----------------------------

const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.headers)
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.json(error)
  }
})


//----------------
//Delete users
//----------------

const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check user id is valid 
  validateMongodbID(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id)
    res.send(deletedUser)
  } catch (error) {
    res.json(error)
  }
})


//-----------------
//Users details
//-----------------

const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check is user id is valid
  validateMongodbID(id);
  try {
    const user = await User.findById(id)
    res.json(user)
  } catch (error) {
    res.json(error)
  }
})



//-----------------
//User profile
//-----------------

const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  //1. find the login user
  //2. check if thos particular user exists or not

  // get the loggin user
  const loginUserId = req?.user?._id.toString()
  // console.log(loginUserId)
  try {
    const myProfile = await User.findById(id).populate('posts').populate('viewedBy');
    const alreadyViewed = myProfile?.viewedBy?.find(user => {
      return user?._id?.toString() === loginUserId
    })
    // console.log(alreadyViewed)
    if(alreadyViewed){
      res.json(myProfile)
    }
    else{
      const profile = await User.findByIdAndUpdate(myProfile?._id , {
        $push : {viewedBy : loginUserId}
      })
      res.json('not viewed') 
    }
  } catch (error) {
    res.json(error);
  }
})

//-----------------
//Update Profile
//-----------------
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  blockUser(req?.user)
  validateMongodbID(_id)

  const user = await User.findByIdAndUpdate(_id, {
    firstName: req?.body?.firstName,
    lastName: req?.body?.lastName,
    email: req?.body?.email,
    bio: req?.body?.bio
  }, {
    new: true,
    runValidators: true
  })
  res.json(user)
})


//-----------------
//Update password
//-----------------

const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbID(_id);
  //Find the user by _id
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  }
  else {
    res.json(user);
  }
});



//----------------
//following
//----------------

const followingUserCtrl = expressAsyncHandler(async (req, res) => {
  //1. find the user you want to follow and update its follower field
  //2. Update  the login user folowing field
  const { followId } = req.body
  const loginUserId = req.user.id;

  //find the target user and check if the login id exits
  const targetUser = await User.findById(followId)

  const alReadyFollowing = targetUser?.followers?.find(user => user?.toString() == loginUserId.toString());

  if (alReadyFollowing) throw new Error('You have already followed this user')
  // console.log(alReadyFollowing)
  //1. find the user you want to follow and update its follower field
  await User.findByIdAndUpdate(followId, {
    $push: { followers: loginUserId },
    isFollowing: true,
  },{new : true})
  //2. Update  the login user folowing field
  await User.findByIdAndUpdate(loginUserId, 
    {
      $push: { following: followId },
    },
    { new: true }
  )
  res.json('You have successfully followed this user')
});


//----------------
//unfollow
//----------------

const unfollowUserCtrl = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(unFollowId, {
    $pull: { followers: loginUserId },
    isFollowing: false,
  }, { new: true });

  await User.findByIdAndUpdate(loginUserId, {
    $pull: { following: unFollowId }
  }, {
    new: true
  })

  res.json('you have successfully unfollowed the user')
})


//----------------
//Block User
//----------------

const blockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);

  const user = await User.findByIdAndUpdate(id, {
    isBlocked: true
  }, {
    new: true
  })
  res.json(user)
})

//--------------
//unblock user
//-------------

const unBlockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);

  const user = await User.findByIdAndUpdate(id, {
    isBlocked: false
  }, {
    new: true
  })
  res.json(user)
})

//-----------------
// Generate email verification token 
//-----------------

const generateVerificationTokenCtrl = expressAsyncHandler(async (req, res) => {
  const loginUserId = req.user.id;

  const user = await User.findById(loginUserId)
  // console.log(user?.email)
  try {
    // Generate token
    const verificationToken = await user?.createAccountVerificationToken();
    //save the user
    await user.save()
    console.log(verificationToken)
    //build a message

    const resetURL = `If you were requested to verify your account ,verify now within 10minutes otherwise ignore this message <a href="http://localhost:3000/verify-account/${verificationToken}">Click to verify </a>`
    const msg = {
      to: user?.email,
      from: 'deepaksinghbohradb@gmail.com',
      subject: 'my first node js email sending ',
      html: resetURL,
    }
    await sgMail.send(msg);
    res.json(resetURL)
  } catch (error) {
    res.json(error) 
  }
})

//----------------------
//Account verification
//----------------------

const accountVerificationCtrl = expressAsyncHandler(async (req, res) => {
  const { token } = req.body
  const hashedToken = crypto.createHash('sha256').update(token).digest("hex")
  //find this user by token

  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: { $gt: new Date() }
  })

  if (!userFound) throw new Error('Token expired , try again later')
  //update the propt to true 
  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;
  await userFound.save();
  res.json(userFound)
})


//-------------------------
//forget password generator 
//-------------------------

const forgetPasswordToken = expressAsyncHandler(async (req, res) => {
  //find user by email
  const { email } = req.body;

  const user = await User.findOne({ email })
  if (!user) throw new Error("User not Found")

  // res.send('forget password')

  try {
    const token = await user.createPasswordResetToken();
    console.log(token)
    await user.save();

    //build your msg
    const resetURL = `If you were requested to reset your account ,reset now within 10minutes 
    otherwise ignore this message <a href="http://localhost:3000/reset-password/${token}">Click to verify</a>`
    const msg = {
      to: email,
      from: 'deepaksinghbohradb@gmail.com',
      subject: 'Reset Password',
      html: resetURL,
    }

    const emailMsg = await sgMail.send(msg)
    res.send({
      msg : `A verification message is successfully sent to ${user?.email} . Reset now within 10 minutes ${resetURL}`
    })

  } catch (error) {
    res.json(error)
  }
})


//-----------------
//password reset
//-----------------

const passwordResetCtrl = expressAsyncHandler (async (req,res) => {
  const {token , password} = req.body;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  //find this user value token

  const user =  await User.findOne({passwordResetToken : hashedToken , passwordResetExpires : {$gt : Date.now()}});

  if(!user) throw new Error ("token expire , try again later")
  
  //update and change password 
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
})

//-----------------
//Profile photo upload
//-----------------

const profilePhotoUploadCtrl = expressAsyncHandler(async (req,res) =>{
  const {_id} = req.user
  //block user
  blockUser(req?.user)
  //get the oath to img
  const localPath = `public/Images/Profile/${req.file.filename}`;
  // Upload image to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath)
  const foundUser = await User.findByIdAndUpdate(_id , {
    profilePhoto : imgUploaded?.url,
  },{
    new: true
  })
  //remove the save image
  fs.unlinkSync(localPath)
  res.json(imgUploaded);
})


module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUsersCtrl,
  deleteUserCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl,
  updateUserPasswordCtrl,
  followingUserCtrl,
  unfollowUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  passwordResetCtrl,
  forgetPasswordToken,
  generateVerificationTokenCtrl,
  accountVerificationCtrl
};