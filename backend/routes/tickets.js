const express = require("express");
const router = express.Router();

const {
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/tickets");

const { auth } = require("../middleware/auth");

//we add auth here to protect this route, before the controller
//router.get("/", getUsers);
router.get("/", auth(["admin", "tech", "free"]), getTickets);

//route to delete users by ID
router.delete("/", deleteTicket);

//route to create user
router.post("/", createTicket);

//route to create user
router.patch("/:id", updateTicket);

module.exports = router;
