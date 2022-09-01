const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const fs = require("fs");
const Post = require("../../model/post/Post");
const validateMongodbId = require("../../utils/validateMongodbID");
const User = require("../../model/User/userModel");
const cloudinaryUploadImg = require("../../utils/cloudinary");


const createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  // validateMongodbId(req.body.user );
  const filter = new Filter();
  var isProfane = filter.isProfane(req.body.title, req.body.description);
  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      "Create failed because it contains profane words and you have been blocked"
    );
  }
  console.log(req.file);
  const localPath = `public/images/post/${req.file.filename}`;
  const imaggeUpload = await cloudinaryUploadImg(localPath);
  try {
    const post = await Post.create({
      ...req.body,
      image: imaggeUpload.url,
      user: _id,
    });
    fs.unlinkSync(localPath);
    res.json(post);
  } catch (error) {
    console.log(error);

    res.json(error);
  }
});

const fetchPostCtrl= expressAsyncHandler(async(req,res)=>{
  const hasCategory = req.query.category
  try {
    if(hasCategory){
      const posts=await Post.find({category:hasCategory}).populate("user")
      res.json(posts)  
    }else{
      const posts=await Post.find({}).populate("user")
      res.json(posts)
    }

  } catch (error) {
    res.json(error)
  }
})

const fetchSinglePostCtrl=expressAsyncHandler(async(req,res)=>{
  const {id}= req.params;
  validateMongodbId(id)
  try {
    const post=await Post.findById(id).populate("user");
    await Post.findByIdAndUpdate(id,{
      $inc:{numViews:1}
    },{
      new:true,
    })
    res.json(post)  
  } catch (error) {
    res.json(error)
  }
})

const postUpdateCtrl=expressAsyncHandler(async(req,res)=>{

  const {id}=req.params;
  validateMongodbId(id);
  try {

    const post=await Post.findByIdAndUpdate(id,
      {...req.body,
        user: req.user?._id,
    },{
      new:true,
    })
    res.json(post)
  } catch (error) {
    res.json(error)
  }
});

const deletePostCtrl = expressAsyncHandler(async(req,res)=>{
  const {id}=req.params;
  validateMongodbId(id);
  try {
    const post=await Post.findByIdAndDelete(id);
    res.json(post);
    
  } catch (error) {
    res.json(error)
  }
})

module.exports = { createPostCtrl,fetchPostCtrl,fetchSinglePostCtrl,postUpdateCtrl,deletePostCtrl };
