const express = require("express");
const router = express.Router();

const {
  getImages,
  createImage,
  createProfilePicture,
} = require("../controllers/images");
const { upload } = require("../middleware/multer");
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
    upload.single("image")(req, res, next);
  },
  createProfilePicture
);

module.exports = router;
