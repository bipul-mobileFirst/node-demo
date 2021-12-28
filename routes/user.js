const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");

module.exports = router;
