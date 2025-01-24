const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    sessionAttempts: {
      type: Number,
      default: 0,
      required: true,
    },
    tokenTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sessions", SessionSchema);
