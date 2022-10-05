const express = require("express");
const {  createChatsCtrl,fetchChatsCtrl,sentNewMessage,allMessage, featchUsers } = require("../../controllers/Chat/Chat");
const authmidlewarres = require("../../middlewares/error/auth");
const chatRoutes = express.Router();




chatRoutes.post('/message',authmidlewarres,sentNewMessage)
chatRoutes.get('/message/:id',authmidlewarres,allMessage)
chatRoutes.get('/',authmidlewarres,fetchChatsCtrl)
chatRoutes.post('/',authmidlewarres,createChatsCtrl)
// chatRoutes.get('/:id',getChats)


module.exports=chatRoutes;