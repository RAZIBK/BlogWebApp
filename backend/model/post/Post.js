const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Post is required"],
        trim:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:[true,"Please Author is required"]

    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    isDisLiked:{
        type:Boolean,
        default:false,
    }, 
    numViews:{
        type:Number,
        default:0,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
    ],
    disLikes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"Please Author is required"]
    },
    description:{
        type:String,
        required:[true,"Post description is required"]
    },
    image:{
        type:String,
        
    },


},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true,
    },
    timestamps:true

}); 

// virtual methode to populate 
postSchema.virtual("Likes", {
    ref:"Likes",
    foreignField:"postId",
    localField:"_id"
}) 

postSchema.virtual("Dislike", {
    ref:"Dislike",
    foreignField:"postId",
    localField:"_id"
})

postSchema.virtual("Comment", {
    ref:"Comment",
    foreignField:"postId",
    localField:"_id"
  })



const Post  = mongoose.model('Post', postSchema);
module.exports=Post;