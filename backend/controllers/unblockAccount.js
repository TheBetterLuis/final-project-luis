const userModel = require("../models/users");

const unblockAccount = async (req, res) => {
  try {
    const { email, resetCode } = req.body;
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const enteredCodeHash = await userModel.generateResetCodeHash(resetCode);
    const isCorrectCode = enteredCodeHash === user.resetCode;

    if (!isCorrectCode) {
      return res.status(401).json({ message: "Codigo incorrecto" });
    }

    user.sessionAttempts = 3;
    user.resetCode = null;

    const updatedUser = await user.save();

    return res.status(200).json({
      message: `Cuenta desbloqueada con exito`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { unblockAccount };
