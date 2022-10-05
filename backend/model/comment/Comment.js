const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, 'PostId Id is required'],
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'User Id is required']
    },
    description: {
    type:String,
    required:[true, 'comment description is required'],
    },
    isEdited:{
      type:Boolean,
      default:false
    },
  },
  {
    timestamps: true,
  }
);



const comment=mongoose.model('Comment',commentSchema);

module.exports = comment;
