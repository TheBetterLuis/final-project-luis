const express = require("express");
const router = express.Router();

const { decodeToken } = require("../controllers/token");

router.post("/", decodeToken);

module.exports = router;
