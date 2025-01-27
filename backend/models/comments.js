const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "ID de usuario es requerido"],
    },
    content: {
      type: String,
      required: [true, "Contenido es requerido"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", CommentSchema);
