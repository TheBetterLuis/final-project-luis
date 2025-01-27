const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "ID de usuario es requerido"],
    },
    techID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "ID de tecnico es requerido"],
    },
    ticketID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tickets",
      required: [true, "ID de ticket es requerido"],
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
