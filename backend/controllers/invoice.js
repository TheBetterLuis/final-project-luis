const invoiceModel = require("../models/invoice");
const userModel = require("../models/users");

const getInvoices = async (req, res) => {
  const invoices = await invoiceModel
    .find()
    .populate("userID", "name lastName profilePicture");
  res.status(200).json(invoices);
};

const getInvoicesByUserID = async (req, res) => {
  try {
    const { userID } = req.params;

    const invoices = await invoiceModel
      .find({ userID })
      .populate("userID", "name lastName profilePicture");

    if (invoices.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron facturas para este usuario" });
    }

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createInvoice = async (req, res) => {
  try {
    const { userID } = req.body;

    const user = await userModel.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const newInvoice = await invoiceModel.create({
      userID,
    });

    await newInvoice.populate("userID", "name lastName profilePicture");

    res
      .status(201)
      .json({ message: "Factura creada exitosamente", invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInvoice = await invoiceModel.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }

    res.status(200).json({ message: "Factura eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInvoices,
  getInvoicesByUserID,
  createInvoice,
  deleteInvoice,
};
