const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/posts");

const { auth } = require("../middleware/auth");

router.get("/", auth(["admin", "tech", "free"]), getPosts);

router.delete("/", deletePost);

router.post("/", createPost);

router.patch("/", updatePost);

module.exports = router;
