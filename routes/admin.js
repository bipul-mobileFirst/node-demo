const router = require("express").Router();
const Post = require("../model/Post");
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAdmin,
} = require("../controllers/verifyToken");
const { upload } = require("../middleware/fileUpload");

// create post
router.post(
  "/create",
  verifyToken,
  verifyTokenAdmin,
  upload.single("image"),
  postController.createPost
);

router.delete(
  "/:postId",
  verifyToken,
  verifyTokenAdmin,
  postController.deletePost
);

// get all users
router.get(
  "/all/users",
  verifyToken,
  verifyTokenAdmin,
  userController.getAllUser
);

module.exports = router;
