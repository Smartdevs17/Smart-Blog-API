const { values } = require("lodash");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");


// Create New Post
const SavePost = async(data) => {
    try {
        // Verify user exist in Database
        const user =await User.findById(data.username);
        if(user){
            const post = await new Post(data);
            const savedPost = await post.save();
            return {success: true,message: savedPost};
        }else{
            return {success: false,message: "No user found with that id"}
        }
    } catch (error) {
        // Error in trying to saved post to DB
        return {success: false,message: error.message}
    }
};


//Update Post
const PatchPost = async(id,data) => {
    try {
        //Check if Post exist with that id
        const post = await Post.findById(id);
        if(post){
            if(post.username.toString() === data.username){
                const updatedPost = await Post.findByIdAndUpdate(id,{$set: data},{new: true});
                return {success: true, message: updatedPost}
            }else{
                return {success: false, message: "Invalid credentials as this post does not belong to that user"}
            }
        }else{
            return {success: false,message: "No post found with that id"}
        }
    } catch (error) {
              // Error in trying to saved post to DB
              return {success: false,message: error.message}  
    }
};

const FetchAPost = async(id) => {
    try {
        //Check if Post exist with that id
        const post = await Post.findById(id);
        if(post){
            return {success: true, message: post}
        }else{
            return {success: false,message: "No post found with that id"}
        }        
    } catch (error) {
        // Error in trying to saved post to DB
        return {success: false,message: error.message}      
    }
}

const FetchUserPost = async(id) => {
    try {
        //Check if Post exist with that id
        
        const user = await User.findById(id);
        if(user){
          let posts = await Post.find({username: user._id})
            if(posts){
                return {success: true ,message: posts}        
            }else{
                return {success: false, message: "No post found for that user"}
            }
        }else{
            return {success: false,message: "No user found with that id"}
        }        
    } catch (error) {
        // Error in trying to saved post to DB
        return {success: false,message: error.message}      
    }
}



const RemovePost = async(id,userId) => {
    try {
        //Check if Post exist with that id
        const post = await Post.findById(id);
        if(post){
            if(post.username.toString() === userId){
                // delete post
                const deletedPost = await Post.findByIdAndDelete(post._id);
                //Delete comments of the post
                const deletedComment = await Comment.deleteMany({postId: deletedPost._id})
                return {success: true, message: deletedPost}
            }else{
                return {success: false, message: "Invalid credentials as your can only delete your own post"}
            }
        }else{
            return {success: false,message: "No post found with that id"}
        }
    } catch (error) {
              // Error in trying to saved post to DB
              return {success: false,message: error.message}  
    }
}


// iyanu adebiyu

module.exports = {SavePost,PatchPost,RemovePost,FetchAPost,FetchUserPost}