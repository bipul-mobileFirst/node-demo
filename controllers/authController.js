const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// register controller
const register = async (req, res) => {
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
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
  });
  try {
    const getEmail = await User.findOne({ email: req.body.email });
    if (!getEmail) {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } else {
      res.status(409).json("email already exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// login controller
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("user not found");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SEC_KEY
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !== req.body.password &&
      res.status(401).json("password not matched");
    const accesstoken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC_KEY,
      { expiresIn: "1d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accesstoken });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { register, login };
