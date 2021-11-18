const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register",async (req,res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
                })
    const user = await newUser.save();
    // console.log(user);
    res.status(201).json({
        message: user
    })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
});


//LOGIN
router.post("/login",async(req,res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            !user && res.status(400).json({
                message: "Wrong Credentials"
            });

            const validated = await bcrypt.compare(req.body.password, user.password);
            !validated && res.status(400).json({
                message: "Please input a valid password"
            });
            
            const {password,...others} = user._doc;
            res.status(201).json(others)
        } catch (error) {
            res.status(500).json(error)
        }
});





module.exports = router;