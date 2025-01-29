const express = require("express");
const router = express.Router();

const { updatePassword } = require("../controllers/updatePassword");

const { auth } = require("../middleware/auth");

//route to update password
router.patch("/", updatePassword);

module.exports = router;
