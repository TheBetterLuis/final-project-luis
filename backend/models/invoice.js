const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "ID de usuario es requerido"],
    },
    paymentDate: {
      type: Date,
      required: [true, "Fecha de pago es requerida"],
      default: Date.now,
    },
    amount: {
      type: Number,
      required: [true, "Monto es requerido"],
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("invoice", InvoiceSchema);
