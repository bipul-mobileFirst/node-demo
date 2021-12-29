const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 8 },
    qualification: { type: String, required: true },
    city: { type: String, required: true },
    phone_no: { type: String, required: true, min: 10 },
    isAdmin: { type: Boolean },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
