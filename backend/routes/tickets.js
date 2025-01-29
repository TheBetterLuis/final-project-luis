const express = require("express");
const router = express.Router();

const {
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/tickets");

const { auth } = require("../middleware/auth");

router.get("/", auth(["admin", "tech", "free"]), getTickets);

//route to delete ticket by ID
router.delete("/", deleteTicket);

//route to create ticket
router.post("/", createTicket);

//route to update ticket
router.patch("/", updateTicket);

module.exports = router;
