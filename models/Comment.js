const mongoose = require("mongoose");



const commentSchema= new mongoose.Schema({ 
    userId: { 
        type: mongoose.Schema.ObjectId,
        required: true
    } ,
    postId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
   name: {
       type: String,
       required: true
   }
},{timestamps: true});


const Comment = mongoose.model("Comment",commentSchema);

module.exports = Comment;