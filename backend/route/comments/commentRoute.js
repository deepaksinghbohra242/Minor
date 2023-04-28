const express =  require('express')
const {createCommentCtrl ,
       fetchCommentCtrl ,
       updateCommentCtrl ,
       deleteCommentCtrl , 
       fetchAllCommentsCtrl} = require('../../controllers/comment/commentCtrl')
const authMiddleware = require('../../middleware/auth/authMiddleware')
const commentRoutes = express.Router()

commentRoutes.post('/',authMiddleware, createCommentCtrl)
commentRoutes.get('/',authMiddleware,fetchAllCommentsCtrl)
commentRoutes.get('/:id',authMiddleware,fetchCommentCtrl)
commentRoutes.put('/:id',authMiddleware, updateCommentCtrl)
commentRoutes.delete('/:id',authMiddleware, deleteCommentCtrl)


module.exports = commentRoutes