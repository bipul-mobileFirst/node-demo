const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAdmin,
} = require("../controllers/verifyToken");
const userController = require("../controllers/userController");

router.put(
  "/delete/:id",
  verifyToken,
  verifyTokenAndAuthorization,
  userController.deleteUser
);
router.put(
  "/update/:id",
  verifyToken,
  verifyTokenAndAuthorization,
  userController.updateUser
);

module.exports = router;
