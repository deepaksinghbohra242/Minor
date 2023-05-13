const expressAsyncHandler = require("express-async-handler");
const Comment = require('../../model/comment/Comment');
const validateMongodbID = require("../../utils/validateMongodbID");
const Post = require("../../model/post/Post");
const blockUser = require("../../utils/blockUser");

//----------------
// Create comment
//----------------
const createCommentCtrl = expressAsyncHandler(async(req,res) => {
    //1. Get the user
    const user = req.user
    //check if comment is blocked or not 
blockUser(user)
    //2. Get the post Id
    const {postId , description} = req.body
    try {
        const comment = await Comment.create({
            post : postId,
            user,
            description 
        })
        res.json(comment); 
    } catch (error) {
        res.json(error)
    }
})

//----------------
// fetch all comments
//----------------

const fetchAllCommentsCtrl = expressAsyncHandler(async(req,res) => {
    
    try {
        const comments = await Comment.find({}).sort('-created');
        res.json(comments);
    } catch (error) {
        res.json(error)
    }
})

//-----------------
//comment details
//-----------------


const fetchCommentCtrl = expressAsyncHandler(async(req,res) => {
    const {id} = req.params

    try {
        const comment = await Comment.findById(id);
        res.json(comment);
    } catch (error) {
        res.json(error)
    }
    // res.json("comment details")

})

//---------------
//update comment 
//---------------

const updateCommentCtrl = expressAsyncHandler(async(req,res) => {
    const {id} = req.params
    validateMongodbID(id)

    try {
        const update = await Comment.findByIdAndUpdate(id, 
            {
                post : req.body?.postId,
                user : req?.user,
                description : req?.body?.description
            },
             {new: true ,
              runValidators : true});
        res.json(update);
    } catch (error) {
        res.json(error)
    }
})

// ---------------
// delete comment
// --------------

const deleteCommentCtrl = expressAsyncHandler(async(req,res) => {
    const {id} = req.params
    validateMongodbID(id)
    try {
        const deleteComment = await Comment.findByIdAndDelete(id);
        res.json(deleteComment);
    } catch (error) {
        res.json(error)
    }
})


module.exports = {createCommentCtrl ,fetchAllCommentsCtrl , fetchCommentCtrl,updateCommentCtrl ,deleteCommentCtrl};