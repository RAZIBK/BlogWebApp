
const express = require("express");
const commentRoutes = express.Router();

const { commentCtrl,fetchAllCommentCtrl,fetchCommentCtrl,updateCommentCtrl,deleteCommentCtrl,fetchPostCommentCtrl } = require("../../controllers/comments/Comments");
const authmidlewarres = require("../../middlewares/error/auth");


commentRoutes.get('/postcomment/:id',authmidlewarres,fetchPostCommentCtrl)

commentRoutes.post('/',authmidlewarres,commentCtrl)
commentRoutes.get('/',authmidlewarres,fetchAllCommentCtrl)
commentRoutes.get('/:id',authmidlewarres,fetchCommentCtrl)
commentRoutes.put('/:id',authmidlewarres,updateCommentCtrl)
commentRoutes.delete('/:id',authmidlewarres,deleteCommentCtrl)





module.exports=commentRoutes;