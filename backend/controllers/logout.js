const userModel = require("../models/users");
//install JSON WEB TOKEN (JWT) : npm i jsonwebtoken

const jwt = require("jsonwebtoken");

const logout = async (req, res) => {
  try {
    const { id } = req.body;

    //check if user exists
    if (!id) {
      return res.status(404).json({ message: "ID de usuario requerido" });
    }

    const user = await userModel.findById(id);

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.SECRET_KEY,
      { expiresIn: "5s" }
    );

    res
      .header("authorization", token)
      .json({ message: "Sesion cerrada exitosamente", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { logout };
