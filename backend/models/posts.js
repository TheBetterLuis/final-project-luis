const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "ID de usuario es requerido"],
    },
    ticketID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tickets",
      required: [true, "ID de ticket  es requerido"],
    },
    commentsID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("posts", PostSchema);
