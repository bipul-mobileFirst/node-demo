const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    postId: { type: String },
    userId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", LikeSchema);
