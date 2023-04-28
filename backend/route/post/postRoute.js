const express = require('express');
const { createPostCtrl ,
        fetchPostCtrl , 
        updatePostCtrl ,
        deletePostCtrl ,
        toggleAddLikeToPostCtrl ,
        toggleAddDislikeToPostCtrl ,
        fetchPostsCtrl} = require('../../controllers/post/postCtrl');
const postRoute = express.Router();
const authMiddleware = require('../../middleware/auth/authMiddleware');
const { photoUpload ,profilePhotoResize ,postImageResize } = require('../../middleware/uploads/photoUpload');

postRoute.post('/', authMiddleware,photoUpload.single('Image'),postImageResize, createPostCtrl )
postRoute.put('/likes',authMiddleware, toggleAddLikeToPostCtrl)
postRoute.put('/dislikes',authMiddleware, toggleAddDislikeToPostCtrl)
postRoute.get('/',fetchPostsCtrl)
postRoute.get('/:id',fetchPostCtrl)
postRoute.put('/:id',authMiddleware, updatePostCtrl)
postRoute.delete('/:id',authMiddleware, deletePostCtrl)

module.exports = postRoute;