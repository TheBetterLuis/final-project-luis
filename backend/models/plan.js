const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    startTime: {
      type: String,
      required: [true, "Tiempo de inicio es requerido"],
    },
    expirationTime: {
      type: Number,
      required: [true, "Tiempo de expiración es requerido"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("plan", PlanSchema);
