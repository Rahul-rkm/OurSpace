const router = require("express").Router()
const Post = require("../models/post")
const User = require("../models/user")
const multer = require('multer')



// create a post
router.post("/", async (req, res) => {
    const post = new Post(req.body)
    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost)
    }
    catch (err) {
        res.status(500).json(err)
    }
})
// update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(201).json("Post updated successfully")
        }
        else {
            res.status(403).json("You can only update your posts")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})
// delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(201).json("Post deleted successfully")
        }
        else {
            res.status(403).json("You can only delete your posts")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})
// like a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(201).json("Liked the post")
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("Unliked the post")
        }
    }
    catch (err) {
        res.status(500).json({ "message": "server error", "errorMsg": err })
    }
})
// get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json(err)
    }
})
// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const followingPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({ userId: friendId })
            })
        )

        res.status(200).json(userPosts.concat(...followingPosts))
        // res.status(200).json("Good")
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// get user's all posts
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId: user._id })
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;