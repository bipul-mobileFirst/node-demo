const Post = require("../model/Post");

// create a post
const createPost = async (req, res) => {
  console.log(req.file);
  const newPost = new Post({
    title: req.body.name,
    image: req.file.filename,
    postBody: req.body.desc,
  });
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all post
const getAllPost = async (req, res) => {
  try {
    const allPost = await Post.find();
    if (allPost.length > 0) {
      res.status(200).json(allPost);
    } else {
      res.status(404).json("post not found");
    }
  } catch (error) {
    res.json(500).json(error);
  }
};

const deletePost = async (req, res) => {
  console.log("post id", req.params.postId);
  try {
    const getId = await Post.findById(req.params.postId);
    if (getId) {
      await Post.findByIdAndDelete(getId);
      res.status(200).json("post has been deleted...");
    } else {
      res.status(404).json("post not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createPost, getAllPost, deletePost };
