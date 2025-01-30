const express = require("express");
const router = express.Router();

const {
  getUserByUserID,
  getUsers,
  getTechUsers,
  getRegularUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

const { auth } = require("../middleware/auth");

router.get("/single", getUserByUserID);

//we add auth here to protect this route, before the controller
//router.get("/", getUsers);
router.get("/", auth(["admin", "tech", "free"]), getUsers);
router.get("/tech", getTechUsers);
router.get("/regular", getRegularUsers);

//route to delete users by ID
router.delete("/", deleteUser);

//route to create user
router.post("/", createUser);

//route to update user
router.patch("/", updateUser);

module.exports = router;
