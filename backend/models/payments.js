const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "ID de usuario es requerido"],
    },
    plan: {
      type: String,
      required: [true, "Plan es requerido"],
      enum: ["free", "premium"],
    },
    amount: {
      type: Number,
      required: [true, "Monto es requerido"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payments", PaymentSchema);
