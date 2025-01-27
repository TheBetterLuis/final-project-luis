const ticketModel = require("../models/tickets");

const getTickets = async (req, res) => {
  const tickets = await ticketModel.find();
  res.status(200).json(tickets);
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

module.exports = { getTickets, createTicket, deleteTicket };
