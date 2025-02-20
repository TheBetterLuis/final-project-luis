const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoices,
  deleteInvoice,
  getInvoicesByUserID,
  checkInvoiceDate,
} = require("../controllers/invoice");

router.post("/create", createInvoice);
router.post("/checkdate/:id", checkInvoiceDate);
router.delete("/delete/:id", deleteInvoice);
router.get("/all", getInvoices);
router.get("/user/:userID", getInvoicesByUserID);

module.exports = router;
