const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    techID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ticketID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tickets",
      required: true,
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

module.exports = mongoose.model("chats", ChatSchema);
