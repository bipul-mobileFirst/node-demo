const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");
const { verifyToken } = require("../controllers/verifyToken");

router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;
