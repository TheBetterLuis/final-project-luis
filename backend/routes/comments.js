const express = require("express");
const router = express.Router();

const {
  createComment,
  getCommentsByPostID,
  deleteCommentbyID,
} = require("../controllers/comments");

const { auth } = require("../middleware/auth");

router.post("/", createComment);

router.post("/post", getCommentsByPostID);

//router.get("/", getUsers);

router.delete("/delete/:commentID", deleteCommentbyID);

//route to update user
//router.patch("/", updateUser);

module.exports = router;
