const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/posts");

const { auth } = require("../middleware/auth");

//we add auth here to protect this route, before the controller
//router.get("/", getUsers);
router.get("/", auth(["admin", "tech", "free"]), getPosts);

//route to delete users by ID
router.delete("/", deletePost);

//route to create user
router.post("/", createPost);

//route to create user
router.patch("/:id", updatePost);

module.exports = router;
