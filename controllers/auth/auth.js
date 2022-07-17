const {CreateUser, ValidateUser} = require("../../services/auth/auth");

// Register User
const RegisterUser = async(req,res) => {
    try {
        //Destructure the username email and password from request body
        const {username,email,password} = req.body;
        //Check if the required field are sent
        if (username && email && password) {
            const values = {
                username,email,password
            }
            //Register new User to the system
            const newUser = await CreateUser(values);
            const {success,message} = newUser;
            if(success){
                res.status(201).json({
                    success: true,message
                });
            }else{
                res.status(400).json({
                    success: false,
                    message,
                    error: "Bad request.User already exits with this username."
                })
            }
        } else {
            res.status(400).json({
                success: false,
                error: "Bad request",
                message: "Username email and password is request"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "There seems to be a problem with the server will be fixed shortly",
            message: error.message
        });
    }
};

const LoginUser = async(req,res) => {
    try {
        // Destructure the email and passaword from the request body
        const {username,password} = req.body;
        if(username && password){
            const values = {
                username,password
            };
            // Validate the username and password;
            const user = await ValidateUser(values);
            const {success,message} = user;
    
            // Return the result of the check status and response
            if(!success){
                res.status(403).json({
                    success: false,error: "Invalid credentials",message
                })
            }else{
                res.status(200).json({
                    success: true,message
                });
            };
        }else{
            res.status(400).json({
                success: false,
                error: "Bad request",
                message: "Username and password is required"
            })
        }
    } catch (error) {
        // In a case of the server error 
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "There seems to be a problem with the server"
        });
    }
};






module.exports = {RegisterUser,LoginUser}