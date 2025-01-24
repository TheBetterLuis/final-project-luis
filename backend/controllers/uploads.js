const multer = require("multer");

const imageUpload = async (req, res) => {
  try {
    const upload = multer({ dest: "savedImages/" });
    await upload.single("file")(req, res, (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      }
      res
        .status(201)
        .json({ message: "image uploaded successfully!", fileInfo: req.file });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { imageUpload };
