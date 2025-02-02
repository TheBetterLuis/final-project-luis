const userModel = require("../models/users");

const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
};

const getUserByUserID = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userModel.find({ _id: id });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const getTechUsers = async (req, res) => {
  try {
    const users = await userModel.find({ role: "tech" });
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const getRegularUsers = async (req, res) => {
  try {
    const users = await userModel.find({
      $or: [{ role: "free" }, { role: "premium" }],
    });
    res.status(200).json(users);
  } catch (e) {
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
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
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

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getUsers,
  getUserByUserID,
  getTechUsers,
  getRegularUsers,
  createUser,
  deleteUser,
  updateUser,
};
