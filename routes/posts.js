const router = require("express").Router();
const User = require("../models/User")
const Post = require("../models/Post")

// Create New Post

router.post("/",async(req,res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    } catch (error) {
       res.status(500).json(error)
    }
});


// DELETE


// Update New Post
router.put("/:id",async(req,res) => {
   try {
       const post = await Post.findById(req.params.id);

        if(post.username === req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,
                    {$set: req.body},
                    {new: true}
                    );
                res.status(201).json(updatedPost)
            } catch (error) {
               res.status(500).json(error)
            }
        }else{
            res.status(400).json({
                message: "You can only update your own post"
            })
        }

   } catch (error) {
      res.status(500).json(error)
   }
});


// Delete New Post
router.delete("/:id",async(req,res) => {
   try {
       const post = await Post.findById(req.params.id);

        if(post.username === req.body.username){
            try {
                await post.delete();
                res.status(201).json("A Post has just being deleted in the DB")
            } catch (error) {
               res.status(500).json(error)
            }
        }else{
            res.status(400).json({
                message: "You can only Delete your own post"
            })
        }

   } catch (error) {
      res.status(500).json(error)
   }
});
 


// Delete Post

// Get a particular users post

router.get("/:id",async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(201).json(post)
    } catch (error) {
       res.status(500).json({message: error})
    }
})



// Get all Post

router.get("/",async(req,res) => {
    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories: {
                $in: [catName]
            }})
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts)
    } catch (error) {
       res.status(500).json({message: error})
    }
})

module.exports = router;