const Post = require("../model/Post");
const Like = require("../model/Likes");
// create a post
const createPost = async (req, res) => {
  console.log(req.file);
  const newPost = new Post({
    title: req.body.title,
    image: req.file.filename,
    // postBody: req.body.desc,
  });
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
};
// update post
const updatePost = async (req, res) => {
  try {
    const postUpdate = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json("post updated");
  } catch (error) {
    res.status(405).json(error);
  }
};

// get all post
const getAllPost = async (req, res) => {
  try {
    const allPost = await Post.find();
    res.status(200).json(allPost);
  } catch (error) {
    res.json(405).json(error);
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

// user like a post
const likesPhotos = async (req, res) => {
  try {
    const like = await Like.findOne({
      userId: req.user.id,
      postId: req.params.postId,
    });
    if (!like) {
      const likePost = await new Like({
        postId: req.params.postId,
        userId: req.user.id,
      });
      const saveLike = await likePost.save();
      res.status(200).json(saveLike);
    } else {
      res.status(406).json("post already liked");
    }
  } catch (error) {
    res.status(403).json(error);
  }
};
// like a single post

const likeSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json("The Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    res.status(407).json(error);
  }
};

// user all liked post
const allLikedPost = async (req, res) => {
  try {
    const likedPost = await Like.find({ userId: req.user.id });
    res.status(200).json(likedPost);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createPost,
  getAllPost,
  deletePost,
  likesPhotos,
  allLikedPost,
  updatePost,
  likeSinglePost,
};
