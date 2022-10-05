const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const fs = require("fs");
const Post = require("../../model/post/Post");
const validateMongodbId = require("../../utils/validateMongodbID");
const User = require("../../model/User/userModel");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const Dislike = require("../../model/post/DisLike");
const Likes = require("../../model/post/like");

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
    res.json(error);
  }
});

const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const hasCategory = req.query.category;
  try {
    if (hasCategory) {
      const posts = await Post.find({ category: hasCategory })
        .populate("user")
        .populate("Likes")
        .populate("Dislike")
        .populate("category")
        .populate("Comment")
        .sort("-createdAt");

      res.json(posts);
    } else {
      const posts = await Post.find({})
        .populate("user")
        .populate("Likes")
        .populate("Dislike")
        .populate("category")
        .populate("category")
        .populate("Comment")
        .sort("-createdAt");
      res.json(posts);
    }
  } catch (error) {
    res.json(error);
  }
});

const fetchSinglePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("category")
      .populate("Comment")
      .populate({
        path: "Comment",
        populate: {
          path: "userId",
        },
      });
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const postUpdateCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { ...req.body, user: req.user?._id },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndDelete(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const toggleAddlikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  const { postId } = req.body;
  const logginUser = req?.user?._id;
  const alreadyDisLike = await Dislike.findOne({
    postId: postId,
    userId: logginUser,
  });
  const alreadyLike = await Likes.findOne({
    postId: postId,
    userId: logginUser,
  });

  if (alreadyDisLike) {
    await Dislike.findOneAndRemove(postId);
    const post = await Likes.create({ postId: postId, userId: logginUser });

    res.json(post);
  } else {
    if (alreadyLike) {
      const post = await Likes.findOneAndRemove(postId);
      await Post.findById(postId, { isLiked: false });
      res.json(post);
    } else {
      const post = await Likes.create({ postId: postId, userId: logginUser });
      res.json(post);
    }
  }
});

const toggleAddDislikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  const { postId } = req.body;
  const logginUser = req?.user?._id;
  const alreadyDisLike = await Dislike.findOne({
    postId: postId,
    userId: logginUser,
  });
  const alreadyLike = await Likes.findOne({
    postId: postId,
    userId: logginUser,
  });

  if (alreadyLike) {
    await Likes.findOneAndRemove(postId);
    const post = await Dislike.create({ postId: postId, userId: logginUser });
    res.json(post);
  } else {
    if (alreadyDisLike) {
      const post = await Dislike.findOneAndRemove(postId);
      await Post.findById(postId, { isLiked: false });
      res.json(post);
    } else {
      const post = await Dislike.create({ postId: postId, userId: logginUser });
      res.json(post);
    }
  }
});

const followersPosts = expressAsyncHandler(async (req, res) => {
  const followers = req?.user?.following;
  try {
    const followedUserPost = await Post.find({ user: { $in: followers } })
      .populate("user")
      .populate("Likes")
      .populate("Dislike")
      .populate("category")
      .sort("-createdAt");

    res.json(followedUserPost);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createPostCtrl,
  fetchPostCtrl,
  fetchSinglePostCtrl,
  postUpdateCtrl,
  deletePostCtrl,
  toggleAddlikeToPostCtrl,
  toggleAddDislikeToPostCtrl,
  followersPosts,
};
