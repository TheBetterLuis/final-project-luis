const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "ID de usuario es requerido"],
    },
    name: {
      type: String,
      required: [true, "Nombre es requerido"],
      minLength: 3,
    },
    lastName: {
      type: String,
      required: [true, "Apellido es requerido"],
      minLength: 3,
    },
    paymentDate: {
      type: Date,
      required: [true, "Fecha de pago es requerida"],
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

module.exports = mongoose.model("invoice", InvoiceSchema);
