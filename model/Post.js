const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String },
    image: { type: String },
    postBody: { type: String },
    likes: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
