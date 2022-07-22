const mongoose = require("mongoose");



const PostSchema= new mongoose.Schema({
    username: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
     title: {
        type: String,
        required: true,
        unique: true
    },
     photo: {
        type: String,
        default: ""
    },
     desc: {
        type: String,
        required: true  
    },
    comment: {
        type: Array,
    }
},{timestamps: true});


const Post = mongoose.model("Post",PostSchema);

module.exports = Post;