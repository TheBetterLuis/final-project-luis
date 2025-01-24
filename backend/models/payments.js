const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
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
