const express = require("express");
const router = express.Router();

const { getUsers, createUser, deleteUser } = require("../controllers/users");

const { auth } = require("../middleware/auth");

//we add auth here to protect this route, before the controller
//router.get("/", getUsers);
router.get("/", auth(["admin", "user"]), getUsers);

//route to delete users by ID
router.delete("/", deleteUser);

//route to create user
router.post("/", createUser);

module.exports = router;
