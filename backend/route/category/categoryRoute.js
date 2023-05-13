const express = require('express');
const { createCategoryCtrl ,
        fetchSingleCategoryCtrl ,
        updateCategoryCtrl ,
        deleteCategoryCtrl ,
        fetchAllCategoryCtrl} = require('../../controllers/category/categoryCtrl');
const authMiddleware = require('../../middleware/auth/authMiddleware');
const categoryRoute = express.Router();


categoryRoute.post('/',authMiddleware,createCategoryCtrl)
categoryRoute.get('/',fetchAllCategoryCtrl)
categoryRoute.get('/:id',fetchSingleCategoryCtrl)
categoryRoute.put('/:id',authMiddleware,updateCategoryCtrl)
categoryRoute.delete('/:id',authMiddleware,deleteCategoryCtrl)

module.exports = categoryRoute