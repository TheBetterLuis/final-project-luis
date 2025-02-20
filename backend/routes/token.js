const express = require("express");
const router = express.Router();

const {
  decodeToken,
  tokenValidation,
  tokenRemoval,
} = require("../controllers/token");

router.post("/", decodeToken);
router.post("/validate", tokenValidation);
router.post("/remove", tokenRemoval);

module.exports = router;
