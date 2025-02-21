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
  getPaginatedOpenTicketsByTechID,
  getPaginatedPendingTicketsByTechID,
  getPaginatedClosedTicketsByTechID,
  createTicket,
  deleteTicket,
  deleteAllTickets,
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
//paginated
router.post("/tech/open/paginate", getPaginatedOpenTicketsByTechID);
router.post("/tech/pending/paginate", getPaginatedPendingTicketsByTechID);
router.post("/tech/closed/paginate", getPaginatedClosedTicketsByTechID);

//router.get("/all", auth(["admin", "tech", "free"]), getTickets);
router.get("/all", getTickets);
router.get("/:_id", getTicketsByTicketID);

//route to delete ticket by ID
router.delete("/", deleteTicket);
router.delete("/delete/all", deleteAllTickets);

//route to create ticket
router.post("/", createTicket);
//route to upload ticket image
router.post("/:id/image", ticketImageUpload.single("image"), uploadTicketImage);

//route to update ticket
router.patch("/", updateTicket);

module.exports = router;
