const userModel = require("../models/users");
const { sendEmail } = require("../util/helpers");

const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
};

const getUserByUserID = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userModel.find({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSafeUserByUserID = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userModel
      .findById(id)
      .select("name lastName profilePicture");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTechUsers = async (req, res) => {
  try {
    const users = await userModel.find({ role: "tech" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRegularUsers = async (req, res) => {
  try {
    const users = await userModel.find({
      $or: [{ role: "free" }, { role: "premium" }],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password, role } = req.body;
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El correo ingresado ya está registrado" });
    }

    const user = await userModel.create({
      name,
      lastName,
      email,
      password: await userModel.encryptPassword(password),
      role,
    });

    sendEmail(
      "L&E TELECOMS - Bienvenida",
      `Estimado/a ${name} ${lastName},

Nos complace darte la bienvenida a nuestra familia de L&E TELECOMS. Estamos emocionados de que hayas decidido unirte a nosotros y esperamos poder ofrecerte el mejor servicio posible.

Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para ayudarte en todo lo que necesites.

¡Gracias por elegir L&E TELECOMS! Esperamos que disfrutes de una experiencia excepcional con nosotros.

Atentamente, El equipo de L&E TELECOMS`,
      email
    );

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the user by ID
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Update user fields (optional, update only if provided in the request body)
    if (req.body.name) user.name = req.body.name;
    if (req.body.lastName) user.lastName = req.body.lastName;

    if (req.body.email) {
      const existingUser = await userModel.findOne({ email: req.body.email });
      if (existingUser && existingUser._id.toString() !== id) {
        res
          .status(400)
          .json({ message: "El correo ingresado ya esta registrado" });
      }
      user.email = req.body.email;
    }

    if (req.body.password)
      user.password = await userModel.encryptPassword(req.body.password);

    if (req.body.role) user.role = req.body.role;
    if (req.body.sessionAttempts)
      user.sessionAttempts = req.body.sessionAttempts;
    if (req.body.plan) user.plan = req.body.plan;

    // Save the updated user to the database
    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "Usuario Actualizado Exitosamente", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const makeRole = async (req, res) => {
  try {
    const { newRole, id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!newRole) {
      return res.status(400).json({ message: "Rol no enviado" });
    }

    user.role = newRole;

    const updatedUser = await user.save();

    res.status(200).json({
      message: `Rol de usuario actualizado a ${newRole}`,
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPaginatedOpenTicketsByTechID = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    //const limit = 10;
    // using 1 limit for testing
    const limit = 1;
    const skip = (page - 1) * limit;

    const { techID } = req.body;
    const tickets = await ticketModel
      .find({ techID: techID, status: "open" })
      .skip(skip)
      .limit(limit);

    const total = await ticketModel.countDocuments({ techID, status: "open" });

    const totalPages = Math.ceil(total / limit);

    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    res.status(200).json({
      tickets,
      total,
      totalPages,
      currentPage: page,
      nextPage,
      previousPage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPaginatedTechUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    //const limit = 10;
    // using 3 limit for testing
    const limit = 3;
    const skip = (page - 1) * limit;

    const users = await userModel
      .find({ role: "tech" })
      .skip(skip)
      .limit(limit);

    const total = await userModel.countDocuments({ role: "tech" });

    const totalPages = Math.ceil(total / limit);

    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    res.status(200).json({
      users,
      total,
      totalPages,
      currentPage: page,
      nextPage,
      previousPage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPaginatedRegularUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    //const limit = 10;
    // using 3 limit for testing
    const limit = 3;
    const skip = (page - 1) * limit;

    const users = await userModel
      .find({ $or: [{ role: "free" }, { role: "premium" }] })
      .skip(skip)
      .limit(limit);

    const total = await userModel.countDocuments({
      $or: [{ role: "free" }, { role: "premium" }],
    });

    const totalPages = Math.ceil(total / limit);

    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    res.status(200).json({
      users,
      total,
      totalPages,
      currentPage: page,
      nextPage,
      previousPage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserByUserID,
  getSafeUserByUserID,
  getTechUsers,
  getPaginatedTechUsers,
  getRegularUsers,
  getPaginatedRegularUsers,
  createUser,
  deleteUser,
  updateUser,
  makeRole,
};
