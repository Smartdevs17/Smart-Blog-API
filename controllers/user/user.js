const { PatchUser, RemoveUser,ReadUser } = require("../../services/user/user");
const {ObjectId} = require("mongodb");


const GetUser = async (req, res) => {
    try {
        // Get a particular  user
        const id = req.params.id;
        if(ObjectId.isValid(id)){
            const user = await ReadUser(id);
            const {success,message} = user;
            if(success){
                res.status(200).json({
                    success: true,
                    message
                });
            }else{
                res.status(404).json({
                    success: false,
                    message,
                    error: "The was a problem with the request"
                });
            }
        }else{
            res.status(400).json({
                success: false,
                error: "Bad request. Please use a valid id"
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


//Upate the user profile User
const UpdateUser = async(req,res) => {
    try {
        // verify the person making the changes updates owns the account
        const id = req.params.id;

        if(ObjectId.isValid(id) && ObjectId.isValid(req.body.userId)){

            if(req.body.userId === id){
                const updateUser = await PatchUser(req.body);
                const {success,message} = updateUser;
                // check if update was success
                if(success){
                    res.status(200).json({
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
                res.status(403).json({
                    success: false,
                    error: "You can only update your own profile"
                });
            }
        }else{
            res.status(400).json({
                success: false,
                error: "Bad request. Please use a valid id"
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

//Delete the user 
const DeleteUser = async(req,res) => {
    try {
        // verify the person deleting his or her account
        const id = req.params.id;
        if(ObjectId.isValid(id) && ObjectId.isValid(req.body.userId)){
            if(req.body.userId === id){
                const deletedUser = await RemoveUser(req.body);
                const {success,message} = deletedUser;
                // check if user was deleted successfully
                if(success){
                    res.status(200).json({
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
                res.status(403).json({
                    success: false,
                    error: "You can only update your own profile"
                });
            }  
        }else{
            res.status(400).json({
                success: false,
                error: "Bad Credentials.Please use a valid id"
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

module.exports = {UpdateUser,DeleteUser,GetUser};