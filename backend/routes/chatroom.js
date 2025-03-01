const express = require("express");
const router = express.Router();

const { createChatroom } = require("../controllers/chatroom");

const { auth } = require("../middleware/auth");

router.post("/create", createChatroom);

module.exports = router;
