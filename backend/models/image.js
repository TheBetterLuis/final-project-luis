const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "image is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("images", ImageSchema);
