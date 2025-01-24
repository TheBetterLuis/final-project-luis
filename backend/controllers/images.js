const imageModel = require("../models/image");
const fs = require("fs");
const path = require("path");

const getImages = async (req, res) => {
  const images = await imageModel.find();
  res.status(200).json(images);
};

const createImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image was sent" });
    }
    const fullUrl = `${process.env.BASE_URL}/images/${req.file.filename}`;
    // saving the image in database
    const image = await imageModel.create({ image: fullUrl });
    res.status(201).json(image);
  } catch (error) {
    if (req.file) {
      const filePath = path.join(
        __dirname,
        `../../images/${req.file.filename}`
      ); // image route
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error("Error while cleaning up untracked image:", error);
        }
      });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getImages, createImage };
