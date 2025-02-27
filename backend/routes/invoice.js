const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoices,
  deleteInvoice,
  getInvoicesByUserID,
  getPaginatedInvoicesByUserID,
  checkInvoiceDate,
  checkInvoiceDateAndUpdateRole,
  validateLatestInvoiceByUserID,
} = require("../controllers/invoice");

router.post("/create", createInvoice);
router.post("/validateuser/:userID", validateLatestInvoiceByUserID);
router.post("/checkdate/:id", checkInvoiceDate);
router.post("/checkandupdate/:id", checkInvoiceDateAndUpdateRole);
router.delete("/delete/:id", deleteInvoice);
router.get("/all", getInvoices);
router.get("/user/:userID", getInvoicesByUserID);
router.get("/paginate/user/:userID", getPaginatedInvoicesByUserID);

module.exports = router;
