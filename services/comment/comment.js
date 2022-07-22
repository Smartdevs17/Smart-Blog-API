const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const User = require("../../models/User");

//Create a Comment
const CreateComment = async(data) => {
    try {
        const post = await Post.findById(data.postId);
        const user = await User.findById(data.userId)
        if(post && user){
            const createdComment = new Comment(data);
            const newComment = await createdComment.save()
            const updatePost = await Post.findByIdAndUpdate(post._id,{$push: {comment:  newComment._id}});
            return {success: true, message: newComment};
        }else{
            return {success: false,message: "No post or user found with that id"};
        }
    } catch (error) {
         // Error in trying to saved post to DB
         return {success: false,message: error.message}  
    }
};

//Get a Comment
const FetchComment = async(id) => {
    try {
        const comment = await Comment.findById(id);
        if(comment){
            return {success: true, message: comment};
        }else{
            return {success: false, message: "No comment found with that id"}
        }
    } catch (error) {
        // Error in trying to saved post to DB
        return {success: false,message: error.message}    
    }
};

// Get all the comment of a post
const FetchPostComment = async(id) => {
    try {
        const comments = await Comment.find({postId: id});
        if(comments){
            return {success: true , message: comments};
        }else{
            return {success: false, message: "No comment found for that post id"}
        }
    } catch (error) {
        // Error in trying to saved post to DB
        return {success: false,message: error.message}         
    }
}


//Update Comment By the Creator of the Comment
const PatchComment = async(id,data) => {
    try {
        //Check if Post exist with that id
        const comment = await Comment.findById(id);
        if(comment){
            if(comment.userId.toString() === data.userId){
                const updatedComment = await Comment.findByIdAndUpdate(comment._id,{$set: data},{new: true});
                return {success: true, message: updatedComment}
            }else{
                return {success: false, message: "Invalid credentials as you are not the person that created the comment"}
            }
        }else{
            return {success: false,message: "No comment found with that id"}
        }
    } catch (error) {
              // Error in trying to saved post to DB
              return {success: false,message: error.message}  
    }
};

// // User Delete comment of his post
// const RemoveComment = async(id,userId) => {
//     try {
//         // Get the owner of the post
//         const owner = await Post.findOne({username: userId});
//         // Get the person that made the comment
//         const user = await Comment.findOne({userId: userId});


//         if(owner.username.toString() === user.userId.toString() || user.userId.toString() === userId){
//             const comment = await Post.find({comment: {$in: [id]}});
//             console.log(comment);
//             if(comment){
//                 const deletedComment = await Comment.findByIdAndDelete(comment._id);
//                 if(deletedComment){
//                     const post = await Post.Update({$pull: {comment: deletedComment._id}})
//                     console.log(post);
//                     return {success: true, message: "Successfully deleted comment"}
//                 }else{
//                     return {success: false, message: "No comment found with that id"}
//                 }
//             }else{
//                 return {success: false, message: "Post does not contain that Comment"}
//             }
        
//         }else{
//             return {success: false, message: "You can only delete comment of you own post"};
//         }
//     } catch (error) {
//         // Error in trying to saved post to DB
//         return {success: false,message: error.message}          
//     }
// }


// User Delete comment of his post
const RemoveComment = async(id,userId) => {
    try {
        // Get the owner of the post
        const owner = await Post.findOne({username: userId});
        // Get the person that made the comment
        const user = await Comment.findOne({userId: userId});
  

        if(owner.username.toString() === user.userId.toString() || user.userId.toString() === userId){
            const comment = await Comment.findByIdAndDelete(id);
            if(comment){
                const post = await Post.findByIdAndUpdate(comment.postId,{$pull: {comment: new Object(comment._id)}});
                return {success: true,message: "Successfully deleted comment"}
            }else{
                return {success: false, message: "No comment found with that id"}
            }
        
        }else{
            return {success: false, message: "You can only delete comment of you own post"};
        }
    } catch (error) {
        // Error in trying to saved post to DB
        return {success: false,message: error.message}          
    }
}

module.exports = {CreateComment,FetchComment,FetchPostComment,RemoveComment,PatchComment}