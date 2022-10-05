const express = require("express");
const {
  createPostCtrl,
  fetchPostCtrl,
  fetchSinglePostCtrl,
  postUpdateCtrl,
  deletePostCtrl,
  toggleAddlikeToPostCtrl,
  toggleAddDislikeToPostCtrl,
  followersPosts,
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
postRoutes.put("/likes", authmidlewarres, toggleAddlikeToPostCtrl);
postRoutes.put("/dislike", authmidlewarres, toggleAddDislikeToPostCtrl);
postRoutes.get("/followersPosts", authmidlewarres, followersPosts);
postRoutes.get("/", fetchPostCtrl);
postRoutes.get("/:id", fetchSinglePostCtrl);
postRoutes.put("/:id", authmidlewarres, postUpdateCtrl);
postRoutes.delete("/:id", authmidlewarres, deletePostCtrl);

module.exports = postRoutes;
