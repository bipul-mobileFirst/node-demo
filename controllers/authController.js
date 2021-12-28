const User = require("../model/User");
const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");

const registerFunction = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SEC_KEY
    ).toString(),
    qualification: req.body.qualification,
    city: req.body.city,
    phone_no: req.body.phone_no,
    isAdmin: req.body.isAdmin,
  });
  try {
    const getEmail = await User.findOne({ email: req.body.email });
    getEmail && res.status(500).json("email already exists");

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { registerFunction };
