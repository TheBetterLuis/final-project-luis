const express = require("express");
const router = express.Router();

const { imageUpload } = require("../controllers/uploads");
const { auth } = require("../middleware/auth");

router.post("/", auth(["admin", "user"]), imageUpload);

module.exports = router;
