const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");


// create schema
const userSchema = new mongoose.Schema({
    firstName : {
        require : [true,'First name is required'],
        type : String ,       
    },
    lastName: {
        require : [true,'Last name is required'],
        type : String ,       
    },
    profilePhoto : {
        type: String,
        default : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
    },
    email: {
        require : [true,'Email is required'],
        type : String ,       
    },
    bio : {
        type: String,
    },
    password: {
        require : [true,'Password is required'],
        type : String,
    },
    postCount : {
        type : Number,
        default : 0,
    },
    isBlocked : {
        type : Boolean,
        default : false,
    },
    admin : {
        type : Boolean,
        default : false,
    },
    role:{
        type : String,
        enum : ['Admin','Guest','Blogger'],
    },
    isFollowing : {
        type : Boolean,
        default : false,
    },
    isUnFollowing : {
        type : Boolean,
        default : false,
    },
    isAccountVerified : {
        type : Boolean,
        default : false,
        
    },
    accountVerificationToken : String ,
    accountVerificationTokenExpires : Date ,
    viewedBy :{
        type:[
            {
                type : mongoose.Schema.ObjectId,
                ref : "User"
            }
        ],
    },
    followers : {
        type : [
            {   
                type : mongoose.Schema.ObjectId,
                ref : "User"
            }
        ]    
    },
    following : {
        type : [
            {   
                type : mongoose.Schema.ObjectId,
                ref : "User"
            }
        ]    
    }, 
    passwordChangedAt : Date ,
    passwordResetToken : String ,
    passwordResetExpires : Date,    
    active : {
        type:Boolean,
        default:false,
    },
},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
})
//virtuals method to  populate

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'user',
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
//verify account 
userSchema.methods.createAccountVerificationToken = async function (){
    //create a token
    const verficationToken = crypto.randomBytes(32).toString("hex");
    this.accountVerificationToken = crypto.createHash('sha256').update(verficationToken).digest("hex")

    this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000; // 10minitues

    return verficationToken;
}

//pasword reset /forget

userSchema.methods.createPasswordResetToken = async function (){
    //create a token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // console.log(resetToken);
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")

    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10minitues 

    return resetToken;
}


// compile schema into model
const User = mongoose.model('User', userSchema);

module.exports = User;