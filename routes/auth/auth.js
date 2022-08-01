const router = require("express").Router();
const {RegisterUser, LoginUser} = require("../../controllers/auth/auth");


router.post("/register",RegisterUser);
router.post("/login",LoginUser);





module.exports = router;
