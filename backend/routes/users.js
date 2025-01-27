const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

const { auth } = require("../middleware/auth");

//we add auth here to protect this route, before the controller
//router.get("/", getUsers);
router.get("/", auth(["admin", "tech", "free"]), getUsers);

//route to delete users by ID
router.delete("/", deleteUser);

//route to create user
router.post("/", createUser);

//route to update user
router.patch("/:id", updateUser);

module.exports = router;
