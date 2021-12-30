const postController = require("../controllers/postController");
const { verifyToken } = require("../controllers/verifyToken");

const router = require("express").Router();

router.get("/all", postController.getAllPost);
router.put("/likes/:postId", verifyToken, postController.likesPhotos);
router.get("/liked/post", verifyToken, postController.allLikedPost);
module.exports = router;
