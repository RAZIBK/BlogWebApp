const expressAsyncHandler = require("express-async-handler");
const Chat = require("../../model/Chat/ChatModel");
const Message = require("../../model/Chat/MessageModel");
const User = require("../../model/User/userModel");

const blockedUser = require("../../utils/IsBlocked");
const validateMongodbId = require("../../utils/validateMongodbID");

const featchUsers = expressAsyncHandler(async (req, res) => {
  console.log(req.query.search);
  console.log(req.user._id);
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.json(users);
});

const createChatsCtrl = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  blockedUser(user);
  const { userId } = req.body;

  let isChat = await Chat.find({
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } },
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestmessage");
  isChat = await User.populate(isChat, {
    path: "latestmessage.sender",
    select: "name profilePhoto email",
  });
  if (isChat.length > 0) {
    res.json(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat, _id }).populate(
        "user",
        "-password"
      );
      res.json(FullChat);
    } catch (error) {
      res.json(error);
    }
  }
});

const fetchChatsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestmessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestmessage.sender",
          select: "name profilePhoto email",
        });
        res.json(results);
      });
  } catch (error) {
    res.json(error);
  }
});

const sentNewMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name profilePhoto");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name profilePhoto email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestmessage: message,
    });
    res.json(message);
  } catch (error) {
    res.json(error);
  }
});

const allMessage = expressAsyncHandler(async (req, res) => {
  try {
    const message = await Message.find({ chat: req.params.id })
      .populate("sender", "name profilePhoto email")
      .populate("chat");
    res.json(message);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createChatsCtrl,
  fetchChatsCtrl,
  sentNewMessage,
  allMessage,
};
