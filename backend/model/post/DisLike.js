const mongoose=require('mongoose');

const dislikeSchema =new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true,
    },
    userId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
},{
    timestamps:true,
});

const Dislike=mongoose.model('Dislike',dislikeSchema);

module.exports = Dislike;