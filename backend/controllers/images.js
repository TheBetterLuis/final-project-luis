const imageModel = require("../models/image");
const userModel = require("../models/users");

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
    const fullUrl = `${process.env.BASE_URL}../../images/${req.file.filename}`;
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

const createProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "La imagen no fue enviada" });
    }

    const fullUrl = `${
      process.env.BASE_URL
    }/frontend/public/profilePictures/${id}/${id}${path.extname(
      req.file.originalname
    )}`;

    const profilePictureUrl = `../../public/profilePictures/${id}/${id}${path.extname(
      req.file.originalname
    )}`;

    // saving the image in database
    const image = await imageModel.create({ image: fullUrl });
    user.profilePicture = profilePictureUrl;
    const updatedUser = await user.save();

    res.status(201).json({ user: updatedUser, image });
  } catch (error) {
    if (req.file) {
      const filePath = path.join(
        __dirname,
        `/frontend/public/profilePictures/${req.params.id}/${
          req.params.id
        }${path.extname(req.file.originalname)}`
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

const setDefaultProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.profilePicture = "../../public/img/default-profile-icon.jpg";
    const updatedUser = await user.save();

    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getImages,
  createImage,
  createProfilePicture,
  setDefaultProfilePicture,
};
