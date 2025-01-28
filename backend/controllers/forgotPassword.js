const userModel = require("../models/users");
const { generateSixDigitCode } = require("../util/helpers");

const forgotPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      const code = generateSixDigitCode().toString();
      user.resetCode = await userModel.generateResetCodeHash(code);
      const updatedUser = await user.save();

      return res.status(200).json({
        message: `${user.email} aqui tienes tu codigo(continuara), ${code}`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { forgotPassword };
