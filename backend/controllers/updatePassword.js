const userModel = require("../models/users");

const updatePassword = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the user by ID
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!req.body.password) {
      return res.status(400).json({ message: "Nueva clave es requerida" });
    }

    user.password = await userModel.encryptPassword(req.body.password);

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updatePassword,
};
