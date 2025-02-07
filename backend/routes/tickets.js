const express = require("express");
const router = express.Router();

const {
  getTickets,
  getTicketsByTicketID,
  getTicketsByUserID,
  getTicketsByTechID,
  getOpenTicketsByTechID,
  getPendingTicketsByTechID,
  getClosedTicketsByTechID,
  createTicket,
  deleteTicket,
  updateTicket,
  uploadTicketImage,
} = require("../controllers/tickets");

const { auth } = require("../middleware/auth");
const { ticketImageUpload } = require("../middleware/ticketImageUpload");

router.post("/user", getTicketsByUserID);
router.post("/tech", getTicketsByTechID);
router.post("/tech/open", getOpenTicketsByTechID);
router.post("/tech/pending", getPendingTicketsByTechID);
router.post("/tech/closed", getClosedTicketsByTechID);

router.get("/all", auth(["admin", "tech", "free"]), getTickets);
router.get("/:_id", getTicketsByTicketID);

//route to delete ticket by ID
router.delete("/", deleteTicket);

//route to create ticket
router.post("/", createTicket);
//route to upload ticket image
router.post("/:id/image", ticketImageUpload.single("image"), uploadTicketImage);

//route to update ticket
router.patch("/", updateTicket);

module.exports = router;
