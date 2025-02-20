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
    const { userID, paymentDate } = req.body;

    const user = await userModel.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const newInvoice = await invoiceModel.create({
      userID,
      paymentDate: paymentDate || Date.now(),
    });

    user.role = "premium";
    user.latestInvoiceID = newInvoice._id;
    await user.save();

    await newInvoice.populate("userID", "name lastName profilePicture role");

    const formattedDate = new Date(newInvoice.paymentDate).toLocaleDateString(
      "es-VE",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );

    res.status(201).json({
      message: `Factura creada exitosamente. Fecha de pago: ${formattedDate}`,
      fecha: `${formattedDate}`,
      invoice: newInvoice,
    });
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

const checkInvoiceDate = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await invoiceModel.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }

    const paymentDate = invoice.paymentDate;
    const currentDate = new Date();
    const daysPassed = Math.floor(
      (currentDate - paymentDate) / (1000 * 60 * 60 * 24)
    );

    if (daysPassed >= 31) {
      return res.status(200).json({
        message: `Más de 31 días han pasado desde la fecha de pago. Han pasado ${daysPassed} dias.`,
      });
    } else {
      return res.status(200).json({
        message: `Menos de 31 días han pasado desde la fecha de pago. Han pasado ${daysPassed} dias.`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkInvoiceDateAndUpdateRole = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await invoiceModel.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }

    const paymentDate = invoice.paymentDate;
    const currentDate = new Date();
    const daysPassed = Math.floor(
      (currentDate - paymentDate) / (1000 * 60 * 60 * 24)
    );

    if (daysPassed >= 31) {
      const user = await userModel.findById(invoice.userID);

      if (user) {
        user.role = "free";
        await user.save();
      }

      return res.status(200).json({
        message: `Más de 31 días han pasado desde la fecha de pago. Han pasado ${daysPassed} dias. Rol actualizado a free`,
        user,
      });
    } else {
      return res.status(200).json({
        message: `Menos de 31 días han pasado desde la fecha de pago. Han pasado ${daysPassed} dias.`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInvoices,
  getInvoicesByUserID,
  createInvoice,
  deleteInvoice,
  checkInvoiceDate,
  checkInvoiceDateAndUpdateRole,
};
