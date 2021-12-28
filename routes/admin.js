const router = require("express").Router();
const Post = require("../model/Post");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");

router.post("/create", verifyToken, verifyTokenAdmin, async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    image: req.body.image,
    postBody: req.body.postBody,
  });
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
