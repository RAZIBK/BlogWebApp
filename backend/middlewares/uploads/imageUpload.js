const multer = require('multer');
const sharp =require('sharp')
const multerStorage= multer.memoryStorage();
const path =require ("path")

const multerFilter= (req,file, cb)=>{
    if (file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb(
            {
                message:'Unsuppported file format',
            },
            false
        );
    }
};

const PhotoUpload=multer({
    storage:multerStorage,
    fileFilter:multerFilter,
    limits:{fileSize:1000000},
});


const profilePhotoResize=async (req,res,next)=>{
    if(!req.file) return next();

    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
    await sharp(req.file.buffer)
    .resize(250,250)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(path.join(`public/images/profilePhotos/${req.file.filename}`));
    next();
};


const postPhotoResize=async (req,res,next)=>{
    if(!req.file) return next();

    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
    await sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(path.join(`public/images/post/${req.file.filename}`));
    next();
};

 

module.exports = {PhotoUpload,profilePhotoResize,postPhotoResize}