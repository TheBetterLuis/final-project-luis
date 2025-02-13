const userModel = require("../models/users");

const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!password) {
      return res.status(400).json({ message: "Nueva clave es requerida" });
    }

    user.password = await userModel.encryptPassword(password);

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updatePassword,
};
