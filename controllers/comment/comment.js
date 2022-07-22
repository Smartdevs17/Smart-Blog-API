const {CreateComment,FetchComment,FetchPostComment,RemoveComment,PatchComment} = require("../../services/comment/comment");

const CreateAComment = async(req,res) => {
    try {
        const {userId,postId,name} = req.body;
        if(userId && postId && name){
            const values = req.body;
            const newComment = await CreateComment(values)
            const {success,message} = newComment;
            
            if(success){
                res.status(201).json({
                    success,message
                })
            }else{
                res.status(500).json({
                    success,message,error: "There was an error while saving comment to database"
                });
            }
        }else{
            res.status(400).json({
                success: false,
                message: "User id and post id is required"
            })
        }
    } catch (error) {
        //Incase of a server error
        console.log(error.message);
        res.status(500).json({
            error: "There seems to be a problem with the server. Will be fixed soon",
            message: error.message
        }); 
    }
};


const GetAComment = async(req,res) => {
    try {
        const id = req.params.id;
        if(id){
            const getComment = await FetchComment(id);
            const {success,message} = getComment;
        
            if(success){
                res.status(201).json({
                    success,message
                })
            }else{
                res.status(500).json({
                    success,message,error: "There was an error while saving comment to database"
                });
            }   
        }else{
            res.status(400).json({
                success: false,
                message: "Bad request please pass in a comment id"
            })
        }
    } catch (error) {
         //Incase of a server error
         console.log(error.message);
         res.status(500).json({
             error: "There seems to be a problem with the server. Will be fixed soon",
             message: error.message
         });        
    }
};

const GetAllPostComment = async(req,res) => {
    try {
        const postId = req.params.postId;
        if(postId){
            const getPostComment = await FetchPostComment(postId);
            const {success,message} = getPostComment;
        
            if(success){
                res.status(201).json({
                    success,message
                })
            }else{
                res.status(500).json({
                    success,message,error: "There was an error while saving comment to database"
                });
            }   
        }else{
            res.status(400).json({
                success: false,
                message: "Bad request please pass in a comment id"
            })
        }    
    } catch (error) {
          //Incase of a server error
          console.log(error.message);
          res.status(500).json({
              error: "There seems to be a problem with the server. Will be fixed soon",
              message: error.message
          });        
    }
}


//Update Comment
const UpdateComment = async(req,res) => {
    try {
        const id = req.params.id;
        const {userId} = req.body;
        if(id && userId){
            const values = req.body;
            const updatedComment = await PatchComment(id,values);
            const {success,message} = updatedComment;
            if(success){
                res.status(201).json({
                    success,message
                })
            }else{
                res.status(500).json({
                    success,message,error: "The was an error while updating comment to database"
                });
            }

        }else{
            res.status(400).json({
                success: false,
                message: "User id is required to update post"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "There seems to be a problem with the server will be fixed soon",
            message: error
        });
    }
};


//Delete a Comment
const DeleteComment = async(req,res) => {
    try {
        // verify the person deleting his or her comment
        const id = req.params.id;
        const userId = req.body.userId;
        
        if(req.body.userId && id){
            const deletedComment = await RemoveComment(id,userId);
            const {success,message} = deletedComment;
            // check if user was deleted successfully
            if(success){
                res.status(201).json({
                    success: true,
                    message
                });
            }else{
                res.status(500).json({
                    success: false,
                    message,
                    error: "There was a problem with the request"
                });
            }
        }else{
            res.status(400).json({
                success: false,
                error: "Your user id and comment id is required to delete post your post"
            });
        }        
    } catch (error) {
        //Incase of a server error
        console.log(error.message);
        res.status(500).json({
            error: "There seems to be a problem with the server. Will be fixed soon",
            message: error.message
        });
    }
};


module.exports = {CreateAComment,GetAComment,GetAllPostComment,UpdateComment,DeleteComment};
