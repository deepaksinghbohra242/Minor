const express = require('express');
const { userRegisterCtrl  ,
    userLoginCtrl ,
    fetchUsersCtrl ,
    deleteUserCtrl ,
    fetchUserDetailsCtrl ,
    userProfileCtrl,
    updateUserCtrl,
    updateUserPasswordCtrl,
    followingUserCtrl,
    unfollowUserCtrl,
    blockUserCtrl,
    forgetPasswordToken,
    generateVerificationTokenCtrl,
    passwordResetCtrl,
    profilePhotoUploadCtrl,
    accountVerificationCtrl,
    unBlockUserCtrl} = require('../../controllers/users/userCtrl');
const authMiddleware = require('../../middleware/auth/authMiddleware');
const { photoUpload  , profilePhotoResize} = require('../../middleware/uploads/photoUpload');
const userRoutes = express.Router();

userRoutes.post("/register",userRegisterCtrl)
userRoutes.post("/login",userLoginCtrl)
userRoutes.get("/",authMiddleware , fetchUsersCtrl)
userRoutes.get("/profile/:id" ,authMiddleware, userProfileCtrl)
userRoutes.put("/follow",authMiddleware ,followingUserCtrl)
userRoutes.post("/forget-password-token",forgetPasswordToken)
userRoutes.put("/profilephoto-upload",authMiddleware,photoUpload.single('Image'),profilePhotoResize,profilePhotoUploadCtrl)
userRoutes.put("/reset-password",passwordResetCtrl)
userRoutes.post("/generate-verify-email-token",authMiddleware, generateVerificationTokenCtrl)
userRoutes.put("/verify-account",authMiddleware, accountVerificationCtrl)
userRoutes.put("/unfollow",authMiddleware ,unfollowUserCtrl)
userRoutes.put("/block-user/:id",authMiddleware ,blockUserCtrl)
userRoutes.put("/unblock-user/:id",authMiddleware ,unBlockUserCtrl)
userRoutes.put("/",authMiddleware ,updateUserCtrl)
userRoutes.put("/password",authMiddleware ,updateUserPasswordCtrl)
userRoutes.delete("/:id",deleteUserCtrl)
userRoutes.get("/:id",fetchUserDetailsCtrl) 

module.exports = userRoutes;