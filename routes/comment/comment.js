const router = require("express").Router();
const {CreateAComment,GetAComment,GetAllPostComment,UpdateComment,DeleteComment} = require("../../controllers/comment/comment");




router.post("/add_comment",CreateAComment);
router.get("/:id",GetAComment);
router.get("/all_comment/:postId",GetAllPostComment);
router.put("/update_comment/:id",UpdateComment);
router.delete("/delete_comment/:id",DeleteComment);












module.exports = router;