const express = require("express");
const {
  registerUser,
  loginUser,
  socialLogin,
} = require("../controllers/userController");
const checkLogin = require("../middleware/checkLogin");
const {
  createComment,
  getSingleVideoComments,
} = require("../controllers/commentController");
const router = express.Router();

router.post("/comments", checkLogin, createComment);
router.get("/video/:id/comments", getSingleVideoComments);
module.exports = router;
