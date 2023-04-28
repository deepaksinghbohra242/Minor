const express = require('express');
const {sendEmailMsgCtrl} = require('../../controllers/Email/emailMessageCtrl');
const authMiddleware = require('../../middleware/auth/authMiddleware');
const emailRoute = express.Router();


emailRoute.post('/',authMiddleware,sendEmailMsgCtrl)

module.exports = emailRoute