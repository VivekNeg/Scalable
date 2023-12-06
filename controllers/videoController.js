const Comment = require("../models/Comment");
const Video = require("../models/Video");

const createVideo = async (req, res, _next) => {
  const { title, dsc, link } = req.body;
  const user = req.user;
  try {
    const video = new Video({
      author: user.id,
      title,
      dsc,
      link,
    });

    const createdVideo = await video.save();

    return res.status(201).json({
      code: 201,
      message: "Video Created Successfull",
      data: { ...createdVideo._doc },
    });
  } catch (err) {
    return res.status(err?.status || 403).json({
      code: err?.status || 403,
    });
  }
};

const findAllVideo = async (req, res, _next) => {
  try {
    const allVideos = await Video.find({});

    return res.status(201).json({
      code: 200,
      data: allVideos,
    });
  } catch (err) {
    return res.status(err?.status || 403).json({
      code: err?.status || 403,
    });
  }
};

const deleteVideo = async (req, res, _next) => {
  const { id } = req.params;
  const user = req.user;
  try {
    if (user.role === "admin") {
      await Video.findByIdAndDelete(id);
      await Comment.deleteMany({ video: id });
      return res.status(200).json({
        code: 200,
        message: "Video Deleted Successfull",
      });
    } else {
      return res.status(403).json({
        code: 403,
        message: "Permison Denied",
      });
    }
  } catch (err) {
    return res.status(err?.status || 403).json({
      code: err?.status || 403,
    });
  }
};

const findSingleVideo = async (req, res, _next) => {
  // const { id } = req.params;
  // try {
  //   const videos = await Video.findById(id);
  //   // const comments = await Comment.find({author: id})
  //   return res.status(201).json({
  //     code: 200,
  //     message: "Video Deleted Successfull",
  //   });
  // } catch (err) {
  //   return res.status(err?.status || 403).json({
  //     code: err?.status || 403,
  //   });
  // }
};

const updateVideo = async (req, res, _next) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(400).json({
        status: 400,
        message: "Bad Request",
      });
    }
    if (user.role === "admin") {
      const title = req.body.title ?? video.title;
      const link = req.body.link ?? video.link;
      const dsc = req.body.dsc ?? video.dsc;

      video.title = title;
      video.link = link;
      video.dsc = dsc;

      await video.save();
      return res.status(200).json({
        code: 200,
        message: "Updated Video",
      });
    } else {
      return res.status(401).json({
        status: 403,
        errorMessage: "Permission denied",
        error: err.message,
      });
    }
  } catch (err) {
    return res.status(403).json({
      errorMessage: "There was a to Create Appoinment",
      error: err,
    });
  }
};

module.exports = {
  createVideo,
  deleteVideo,
  updateVideo,
  findAllVideo,
  findSingleVideo,
};
