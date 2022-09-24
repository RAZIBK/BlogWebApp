const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/Comment");
const blockedUser = require("../../utils/IsBlocked");
const validateMongodbId = require("../../utils/validateMongodbID");


const commentCtrl = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  blockedUser(user)
  const { postId, description } = req.body;
  try {
    const comment = await Comment.create({
      postId: postId,
      userId: user._id,
      description: description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

const fetchAllCommentCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const comment = await Comment.find({}).sort("-created");
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

const fetchPostCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const comment = await Comment.find({ postId: id }).populate("userId").sort({_id:-1})
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

const fetchCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const comment = await Comment.findById(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

const updateCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  blockedUser(user)
  validateMongodbId(id);
  const { description } = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        description: description,
        isEdited:true,
      },
      { new: true, runValidators: true }
    );
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

const deleteCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  commentCtrl,
  fetchAllCommentCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
  fetchPostCommentCtrl,
};
