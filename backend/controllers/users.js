const userModel = require("../models/users");

const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password, role } = req.body;
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
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL params

    // Find the user by ID
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields (optional, update only if provided in the request body)
    if (req.body.name) user.name = req.body.name;

    if (req.body.email) {
      const existingUser = await userModel.findOne({ email: req.body.email });
      if (existingUser && existingUser._id.toString() !== id) {
        res.status(400).json({ message: "Email already exists" });
      }
      user.email = req.body.email;
    }

    if (req.body.password)
      user.password = await userModel.encryptPassword(req.body.password);

    if (req.body.role) user.role = req.body.role;
    // Add updates for other fields like role, password (if applicable)
    // e.g.,

    // Save the updated user to the database
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, createUser, deleteUser, updateUser };
