const {SavePost,PatchPost,FetchAPost,FetchUserPost,RemovePost} = require("../../services/post/post");

// Create New Post
const CreatePost = async(req,res) => {
    try {
        const {username,title} = req.body;
        if(username && title){
            const values = req.body;
            const newPost = await SavePost(values)
            const {success,message} = newPost;
            
            if(success){
                res.status(201).json({
                    success,message
                })
            }else{
                res.status(500).json({
                    success,message,error: "The was an error while saving post to database"
                });
            }
        }else{
            res.status(400).json({
                success: false,
                message: "User id and post title is required"
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

//Update Post
const UpdatePost = async(req,res) => {
    try {
        const id = req.params.id;
        const {username} = req.body;
        if(id && username){
            const values = req.body;
            const updatedPost = await PatchPost(id,values);
            const {success,message} = updatedPost;
            if(success){
                res.status(201).json({
                    success,message
                })
            }else{
                res.status(500).json({
                    success,message,error: "The was an error while updating post to database"
                });
            }

        }else{
            res.status(400).json({
                success: false,
                message: "User is required to update post"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "There seems to be a problem with the server will be fixed soon",
            message: error
        });
    }
}


//Read A Post 
const GetAPost = async(req,res) => {
    try {
        const id = req.params.id;
        const post = await FetchAPost(id);
        const {success,message} = post;
        if(success){
            res.status(200).json({
                success,message
            })
        }else{
            res.status(500).json({
                success,message,error: "The was an error while fetching post to database"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "There seems to be a problem with the server will be fixed soon",
            message: error
        });   
    }
};


//Get all post made by a user
const GetUserPost = async(req,res) => {
    try {
        const userId = req.body.userId;
        if(userId){
            const userPost = await FetchUserPost(userId);
            const {success,message} = userPost;
            if(success){
                res.status(200).json({
                    success,message
                })
            }else{
                res.status(500).json({
                    success,message,error: "The was an error while fetching users post to database"
                });
            }
        }else{
            res.status(400).json({
                success: false,
                message: "User id is required"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "There seems to be a problem with the server will be fixed soon",
            message: error
        });         
    }
};


//Delete a Post
const DeletePost = async(req,res) => {
    try {
        // verify the person deleting his or her account
        const id = req.params.id;
        const userId = req.body.userId;
        if(req.body.userId && id){
            const deletedPost = await RemovePost(id,userId);
            const {success,message} = deletedPost;
            // check if user was deleted successfully
            if(success){
                res.status(201).json({
                    success: true,
                    message
                });
            }else{
                res.status(400).json({
                    success: false,
                    message,
                    error: "The was a problem with the request"
                });
            }
        }else{
            res.status(400).json({
                success: false,
                error: "Your user id and post id is required to delete post your post"
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
}










module.exports = {CreatePost,UpdatePost,GetAPost,GetUserPost,DeletePost};