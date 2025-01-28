const express = require("express");
const router = express.Router();

const { unblockAccount } = require("../controllers/unblockAccount");

router.post("/", unblockAccount);

module.exports = router;
