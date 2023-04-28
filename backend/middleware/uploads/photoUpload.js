const multer = require("multer")
const sharp = require("sharp")
const path = require("path")
//storage
const multerStorage = multer.memoryStorage()

//file type checking
const multerFilter =  (req,file,cb) => {
    //check file type
    
    if(file.mimetype.startsWith("image")){
        cb(null ,true) 
    }
    else{
        cb({
            message:"Unsupported file format"
        },false)
    }
}

const photoUpload = multer({
    storage : multerStorage,
    fileFilter : multerFilter,
    limits : {fileSize : 1000000} , 
})


//Image resizing
const profilePhotoResize = async (req,res,next) =>{
    //check if there is no file 
    if(!req.file) return next();

    req.file.filename = `user-${Date.now()}-${req.file.originalname}`
    await sharp(req.file.buffer).resize(250,250).toFormat("jpeg").jpeg({quality:90}).toFile(path.join(`public/Images/Profile/${req.file.filename}`))
    next();
}

//post Image resizing
const postImageResize = async (req,res,next) =>{
    //check if there is no file 
    if(!req.file) return next();

    req.file.filename = `user-${Date.now()}-${req.file.originalname}`
    await sharp(req.file.buffer).resize(500,500).toFormat("jpeg").jpeg({quality:90}).toFile(path.join(`public/Images/post/${req.file.filename}`))
    next();
}

module.exports = {photoUpload , profilePhotoResize ,postImageResize}