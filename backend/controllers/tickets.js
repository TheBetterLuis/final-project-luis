const ticketModel = require("../models/tickets");

const getTickets = async (req, res) => {
  const tickets = await ticketModel.find();
  res.status(200).json(tickets);
};

const getTicketsByUserID = async (req, res) => {
  try {
    const { userID } = req.body;
    const tickets = await ticketModel.find({ userID: userID });
    res.status(200).json(tickets);
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const getTicketsByTechID = async (req, res) => {
  try {
    const { techID } = req.body;
    const tickets = await ticketModel.find({ techID: techID });
    res.status(200).json(tickets);
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const getOpenTicketsByTechID = async (req, res) => {
  try {
    const { techID } = req.body;
    const tickets = await ticketModel.find({ techID: techID, status: "open" });
    res.status(200).json(tickets);
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingTicketsByTechID = async (req, res) => {
  try {
    const { techID } = req.body;
    const tickets = await ticketModel.find({
      techID: techID,
      status: "pending",
    });
    res.status(200).json(tickets);
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const getClosedTicketsByTechID = async (req, res) => {
  try {
    const { techID } = req.body;
    const tickets = await ticketModel.find({
      techID: techID,
      status: "closed",
    });
    res.status(200).json(tickets);
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const createTicket = async (req, res) => {
  try {
    const { userID, techID, title, description, reportDate, image, status } =
      req.body;
    const ticket = await ticketModel.create({
      userID,
      techID,
      title,
      description,
      reportDate,
      image,
      status,
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedTicket = await ticketModel.findByIdAndDelete(id);
    if (!deletedTicket) {
      res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const { id } = req.body;

    const ticket = await ticketModel.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (req.body.userID) ticket.userID = req.body.userID;
    if (req.body.techID) ticket.techID = req.body.techID;
    if (req.body.title) ticket.title = req.body.title;
    if (req.body.description) ticket.description = req.body.description;
    if (req.body.reportDate) ticket.reportDate = req.body.reportDate;
    if (req.body.image) ticket.image = req.body.image;
    if (req.body.status) ticket.status = req.body.status;

    const updatedTicket = await ticket.save();

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
  getTicketsByUserID,
  getTicketsByTechID,
  getOpenTicketsByTechID,
  getPendingTicketsByTechID,
  getClosedTicketsByTechID,
};
