const Comment = require("../models/Comment");

const createComment = async (req, res, next) => {
  const { body, videoId } = req.body;
  const user = req.user;
  try {
    const comment = new Comment({ body, author: user.id, video: videoId });
    const newComment = await comment.save();
    return res.status(200).json({
      code: 200,
      message: "Comment Create Successfull",
      data: newComment,
    });
  } catch (err) {
    return res.status(403).json({
      errorMessage: "There was a problem",
      error: err.message,
    });
  }
};

const getSingleVideoComments = async (req, res, _next) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ video: id });
    return res.status(200).json({
      code: 200,
      data: comments,
    });
  } catch (err) {
    return res.status(403).json({
      errorMessage: "There was a problem",
      error: err.message,
    });
  }
};

module.exports = {
  createComment,
  getSingleVideoComments,
};
