const bcrypt = require("bcrypt");
const User = require("../../models/User");


// Create New User
const CreateUser = async (data) => {
    try {
        // Generate hashed Password
        let salt = await bcrypt.genSalt(10);
        let hasehedPassword = await bcrypt.hash(data.password,salt);
        data.password = hasehedPassword;

        // Saved User to DB
        let newUser = new User(data);
        let savedUser = await newUser.save();
        const {password,...results} = savedUser._doc;
        
        // Return Registered  Data
        return {success: true,message: results};
        // console.log(savedUser);
    } catch (error) {
        console.log(error.message);
        // Incase of any error return Error
        return {success: false,message: error.message};
    }
};


//Login User
const ValidateUser = async(data) => {
    try {
        //Search User from Db
        let user = await User.findOne({username: data.username});
        //If user does not exist
        if(!user){
            return {success: false, message: "No user found with this username"}
        }else{
            //Validate user password
            let validatePassword = await bcrypt.compare(data.password,user.password);
            if(!validatePassword){
                return {success: false, message: "Invalid user password!!!"}
            }
            // return validated user password
            const {password, ...results} = user._doc;
            return {success: true, message: results}
        }
    } catch (error) {
        // Incase of any errors return errors
        console.log(error);
        return {success: false,message: error.message}
    }
};





module.exports = {CreateUser,ValidateUser}