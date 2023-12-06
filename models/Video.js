const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const VideoSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    dsc: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
