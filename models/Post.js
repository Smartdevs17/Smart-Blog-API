const mongoose = require("mongoose");



const PostSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
     title: {
        type: String,
        required: true,
        uniquire: true
    },
     photo: {
        type: String,
        required: false
    },
     desc: {
        type: String,
        required: true  
    },
    catergories: {
        type: Array,
        required: false
    }
},{timestamps: true});


const Post = mongoose.model("Post",PostSchema);

module.exports = Post;