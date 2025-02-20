const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoices,
  deleteInvoice,
  getInvoicesByUserID,
} = require("../controllers/invoice");

router.post("/create", createInvoice);
router.delete("/delete/:id", deleteInvoice);
router.get("/all", getInvoices);
router.get("/user/:userID", getInvoicesByUserID);

module.exports = router;
