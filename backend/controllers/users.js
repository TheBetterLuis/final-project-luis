const userModel = require("../models/users");

const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await userModel.create({
      name,
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
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, createUser, deleteUser };
