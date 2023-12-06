const express = require("express");
const {
  registerUser,
  loginUser,
  socialLogin,
} = require("../controllers/userController");
const checkLogin = require("../middleware/checkLogin");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/socialLogin", socialLogin);
module.exports = router;
