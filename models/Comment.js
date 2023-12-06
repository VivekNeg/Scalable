const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    body: {
      type: String,
    },
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
    video: {
      type: Schema.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true, id: true }
);

const Comment = model("Comment", CommentSchema);
module.exports = Comment;
