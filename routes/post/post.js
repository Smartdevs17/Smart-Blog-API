const router = require("express").Router();
const {CreatePost,UpdatePost,GetAPost,GetUserPost, DeletePost} = require("../../controllers/post/post");


router.post("/create_post",CreatePost);
router.get("/:id",GetAPost);
router.get("/user/:id",GetUserPost)
router.put("/update_post/:id",UpdatePost);
router.delete("/delete_post/:id",DeletePost)







module.exports = router;
