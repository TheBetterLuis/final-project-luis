const express = require("express");
const router = express.Router();

const {
  getImages,
  createImage,
  createProfilePicture,
  setDefaultProfilePicture,
} = require("../controllers/images");
const { upload } = require("../middleware/multer");

const { profilePicUpload } = require("../middleware/profilePicUpload");

// route to obtain images
router.get("/", getImages);

//route to upload an image
router.post(
  "/",
  (req, res, next) => {
    //req.params.folderName = "users" // defines the folder where images will be stored
    upload.single("image")(req, res, next);
  },
  createImage
);

router.post(
  "/profile/:id",
  (req, res, next) => {
    //req.params.folderName = "users" // defines the folder where images will be stored
    profilePicUpload.single("image")(req, res, next);
  },
  createProfilePicture
);

router.post("/profile/default/:id", setDefaultProfilePicture);

module.exports = router;
