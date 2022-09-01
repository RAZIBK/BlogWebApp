const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Post is required"],
        trim:true,
    },
    category:{
        type:String,
        required:[true,'post category is required'],

    },
    isLinked:{
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



const Post  = mongoose.model('Post', postSchema);
module.exports=Post;