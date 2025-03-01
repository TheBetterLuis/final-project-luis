const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nombre es requerido"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("chatroom", chatroomSchema);
