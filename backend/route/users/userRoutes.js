const express = require("express");
const {
  userResgisterCtrl,
  userLoginCtrl,
  fetcUsersCtrl,
  fetchUserDetailsCtrl,
  UserProfileCtrl,
  updateUserCtrl,
  passwordUpdateCtrl,
  followingUserCtrl,
  unFollowUserctrl,
  blockUserCtrl,
  unblockUserCtrl,profilePhotoUploadctrl,fetcSerchUsersCtrl
} = require("../../controllers/User/userController");
const authmidlewarres = require("../../middlewares/error/auth");
const { PhotoUpload,profilePhotoResize } = require("../../middlewares/uploads/imageUpload");
const userRoutes = express.Router();



userRoutes.post("/register", userResgisterCtrl);
userRoutes.post("/login", userLoginCtrl);
userRoutes.get("/",authmidlewarres, fetcUsersCtrl);
userRoutes.get("/search",authmidlewarres, fetcSerchUsersCtrl);

userRoutes.put("/password", authmidlewarres, passwordUpdateCtrl);
userRoutes.put("/profilephoto-update", authmidlewarres,PhotoUpload.single('image'),profilePhotoResize, profilePhotoUploadctrl);
userRoutes.put('/follow',authmidlewarres,followingUserCtrl);
userRoutes.put('/unfollow',authmidlewarres,unFollowUserctrl);
userRoutes.put('/block-user/:id',authmidlewarres,blockUserCtrl);
userRoutes.put('/unblock-user/:id',authmidlewarres,unblockUserCtrl)
userRoutes.get("/profile/:id", authmidlewarres, UserProfileCtrl);
userRoutes.put("/", authmidlewarres, updateUserCtrl);
userRoutes.get("/:id", authmidlewarres, fetchUserDetailsCtrl);


module.exports = userRoutes;
