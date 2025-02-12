const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPostsByUserID,
  getPublicPostsByUserID,
  getPrivatePostsByUserID,
  createPost,
  deletePost,
  updatePost,
  fetchAllPostsAndTickets,
  fetchPublicPostsAndTickets,
  fetchPrivatePostsAndTickets,
} = require("../controllers/posts");

const { auth } = require("../middleware/auth");

router.get("/", auth(["admin", "tech", "free"]), getPosts);
router.get("/user", getPostsByUserID);
router.get("/user/public", getPublicPostsByUserID);
router.get("/user/private", getPrivatePostsByUserID);
router.get("/tickets", auth(["admin", "tech"]), fetchAllPostsAndTickets);
router.get("/tickets/public", fetchPublicPostsAndTickets);
router.get(
  "/tickets/private",
  auth(["admin", "tech"]),
  fetchPrivatePostsAndTickets
);

router.delete("/", deletePost);

router.post("/", createPost);

router.patch("/", updatePost);

module.exports = router;
