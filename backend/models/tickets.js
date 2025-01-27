const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    techID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    title: {
      type: String,
      required: [true, "Titulo es requerido"],
      minLength: 3,
    },
    description: {
      type: String,
      required: [true, "Descripción es requerida"],
    },
    reportDate: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["open", "pending", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tickets", TicketSchema);
