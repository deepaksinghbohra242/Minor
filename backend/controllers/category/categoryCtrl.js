const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/category/Category");

//create
const createCategoryCtrl = expressAsyncHandler(async(req,res) => {
    try {
        const category = await Category.create({
            user: req.user._id,
            title : req.body.title
        });
        res.json(category)
    } catch (error) {
        res.json(error)
    }
})  

//--------------
//fetch all
//--------------
const fetchAllCategoryCtrl = expressAsyncHandler(async(req,res) => {
    // res.json('fetch all cat')
    try {
        const categories = await Category.find({}).populate('user').sort('_createdAt');
        res.json(categories)
    } catch (error) {
        res.json(error)
    }
})

//---------------
//fetch single
//---------------

const fetchSingleCategoryCtrl = expressAsyncHandler(async(req,res) => {
    const {id} = req.params
    // res.json('fetch single cat')
    try {
        const category = await Category.findById(id).populate('user').sort('_createdAt');
        res.json(category)
    } catch (error) {
        res.json(error)
    }
})

//----------------
//update
//----------------
const updateCategoryCtrl = expressAsyncHandler(async (req,res) => {
    const {id} = req.params
    try {
        const category = await Category.findByIdAndUpdate(id ,{
            title : req?.body?.title
        },{
            new : true,
            runValidators : true
        })
        res.json(category)
    } catch (error) {
        res.json(error)
    }
})

//---------------
//delete
//---------------
const deleteCategoryCtrl = expressAsyncHandler(async(req,res) => {
    const {id} = req.params;
    try {
        const category = await Category.findByIdAndDelete(id)

        res.json(category)
    } catch (error) {
        res.json(error)
    }
})

module.exports = {createCategoryCtrl , fetchAllCategoryCtrl ,fetchSingleCategoryCtrl, updateCategoryCtrl,deleteCategoryCtrl};