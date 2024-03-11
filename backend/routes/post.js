const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");

//create post
router.post("/", async (req, res) => {
  try {
  //   if(req.body.file){
  //     req.body.img = await cloudinary.v2.uploader.upload(req.body.file, {
  //     folder: "avatars",
  //     width: 150,
  //     crop: "scale",
  //   });
  //  }
   console.log("hi"+req.body.file)
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("post not found");
    }
    if (post.userId != req.body.userId) {
      return res.status(400).json("you cannot change the post");
    }
    await post.updateOne({ $set: req.body });
    res.status(200).json("post has been updated");
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("post not found");
    }
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json("post has been deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

//like post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("post not found");
    }
    if (post.userId === req.body.userId) {
      return res.status(400).json("you cannot like your own post");
    }
    if (post.likes.includes(req.body.userId)) {
      return res.json("you already liked the post");
    }
    await post.updateOne({ $push: { likes: req.body.userId } });
    res.status(200).json("you like the post");
  } catch (err) {
    res.status(400).json(err);
  }
});

//dislike post
router.put("/:id/dislike", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("post not found");
    }
    if (post.userId === req.body.userId) {
      return res.status(400).json("you cannot like your own post");
    }
    if (!post.likes.includes(req.body.userId)) {
      return res.json("you already disliked the post");
    }
    await post.updateOne({ $pull: { likes: req.body.userId } });
    res.status(200).json("you dislike the post");
  } catch (err) {
    res.status(400).json(err);
  }
});

//get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("post not found");
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get timline post
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all user post
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
