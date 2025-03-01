const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chatroom",
      required: [true, "chatroom es requerido"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "usuario es requerido"],
    },
    message: {
      type: String,
      required: [true, "mensaje es requerido"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("message", messageSchema);
