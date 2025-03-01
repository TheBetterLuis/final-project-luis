const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPostsByUserID,
  getPublicPostsByUserID,
  getPublicPostsPaginated,
  getPrivatePostsByUserID,
  createPost,
  deletePost,
  deleteAllPosts,
  updatePost,
  fetchPublicPostsAndTickets,
  fetchPrivatePostsAndTickets,
  getPostByTicketID,
  likePost,
  getPersonalProfilePostsPaginatedByUserID,
  getPublicProfilePostsPaginatedByUserID,
} = require("../controllers/posts");

const { auth } = require("../middleware/auth");
//make sure it's post if you send a body
router.get("/", auth(["admin", "tech", "free"]), getPosts);
router.get("/:_id", getPostByTicketID);
router.post("/user", getPostsByUserID);
router.get("/user/public", getPublicPostsByUserID);
router.post(
  "/paginate/personalprofile/",
  getPersonalProfilePostsPaginatedByUserID
);

router.post("/paginate/publicprofile/", getPublicProfilePostsPaginatedByUserID);

router.post("/paginate", getPublicPostsPaginated);
router.get("/user/private", getPrivatePostsByUserID);
router.get("/tickets/public", fetchPublicPostsAndTickets);
router.get(
  "/tickets/private",
  auth(["admin", "tech"]),
  fetchPrivatePostsAndTickets
);

router.delete("/:id", deletePost);
router.delete("/delete/all", deleteAllPosts);

router.post("/", createPost);

router.post("/:postId/like", likePost);

router.patch("/", updatePost);

module.exports = router;
