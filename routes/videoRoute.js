const express = require("express");
const {
  createVideo,
  findAllVideo,
  deleteVideo,
  updateVideo,
  findSingleVideo,
} = require("../controllers/videoController");
const checkLogin = require("../middleware/checkLogin");
const router = express.Router();

router.post("/videos", checkLogin, createVideo);
router.get("/videos", findAllVideo);
router.delete("/videos/:id", checkLogin, deleteVideo);
router.patch("/videos/:id", checkLogin, updateVideo);
router.get("/videos/:id", findSingleVideo);

module.exports = router;
