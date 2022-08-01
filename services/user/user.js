const User = require("../../models/User");
const bcrypt = require("bcrypt");

const ReadUser = async(data) => {
    try {
        //find user by id from db
        let existingUser = await User.findById(data);
        if(existingUser){
            const {password, ...results} = existingUser._doc;
            return {success: true, message: results}
        }else{
            return {success: false, message: "No user found with that id"}
        }
    } catch (error) {
    // In the case there is an error getting the user
     console.log(error.message);
    return {success: false,message: error.message}  
    }
}

//Upate a user profile
const PatchUser = async(data) => {
    try {
        //Check if User exit with that id
        const user = await User.findById(data.userId);
        if(user){
            //Upate the user password
            if(data.password){
                let salt = await bcrypt.genSalt(10);
                let hashedPassword = await bcrypt.hash(data.password,salt);
                data.password = hashedPassword;
                let updatedUser = await User.findByIdAndUpdate( data.userId,{$set: data},{new: true});
                let {password,...results} = updatedUser._doc;
                return {success: true,message: results};
            }else{
                //Update user profile with the given data
                let updatedUser = await User.findByIdAndUpdate(data.userId,{$set: data},{new: true});
                let {password,...results} = updatedUser._doc;
                return {success: true,message: results}
            }
        }else{
            return {success: false,message: "No user found with that id"}
        }
    } catch (error) {
        // In the case there is an error updating the user
        console.log(error.message);
        return {success: false,message: error.message}
    }
};

// Completely remove a user from db
const RemoveUser = async(data) => {
    try {
        // find ther user by his or her id and delete
        let user = await User.findByIdAndDelete(data.userId);
        if(user){
            return {success: true,message: "Successfully deleted user account"}
        }else{
            return {success: false, message: "No user found with that id"}
        }
    } catch (error) {
          // In the case there is an error removing the user
          return {success: false,message: error.message} 
    }
}



module.exports = {PatchUser,RemoveUser,ReadUser};