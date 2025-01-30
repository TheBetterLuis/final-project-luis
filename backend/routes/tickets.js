const express = require("express");
const router = express.Router();

const {
  getTickets,
  getTicketsByUserID,
  getTicketsByTechID,
  getOpenTicketsByTechID,
  getPendingTicketsByTechID,
  getClosedTicketsByTechID,
  createTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/tickets");

const { auth } = require("../middleware/auth");

router.get("/user", getTicketsByUserID);
router.get("/tech", getTicketsByTechID);
router.get("/tech/open", getOpenTicketsByTechID);
router.get("/tech/pending", getPendingTicketsByTechID);
router.get("/tech/closed", getClosedTicketsByTechID);

router.get("/all", auth(["admin", "tech", "free"]), getTickets);

//route to delete ticket by ID
router.delete("/", deleteTicket);

//route to create ticket
router.post("/", createTicket);

//route to update ticket
router.patch("/", updateTicket);

module.exports = router;
