const { UpdateUser, DeleteUser, GetUser } = require("../../controllers/user/user");

const router = require("express").Router()

router.get("/:id",GetUser);
router.put("/update/:id",UpdateUser);
router.delete("/delete/:id",DeleteUser);






module.exports = router;