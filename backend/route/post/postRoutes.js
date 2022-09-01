const express = require("express");
const {
  createPostCtrl,
  fetchPostCtrl,
  fetchSinglePostCtrl,
  postUpdateCtrl,
  deletePostCtrl,
} = require("../../controllers/Post/postController");
const authmidlewarres = require("../../middlewares/error/auth");
const {
  PhotoUpload,
  postPhotoResize,
} = require("../../middlewares/uploads/imageUpload");
const postRoutes = express.Router();

postRoutes.post(
  "/",
  authmidlewarres,
  PhotoUpload.single("image"),
  postPhotoResize,
  createPostCtrl
);
postRoutes.get("/", fetchPostCtrl);
postRoutes.get('/:id',authmidlewarres,fetchSinglePostCtrl)
postRoutes.put('/:id', authmidlewarres,postUpdateCtrl)
postRoutes.delete('/:id',authmidlewarres,deletePostCtrl)

module.exports = postRoutes;
