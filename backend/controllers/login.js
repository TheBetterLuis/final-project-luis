const userModel = require("../models/users");
//install JSON WEB TOKEN (JWT) : npm i jsonwebtoken

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFind = await userModel.findOne({ email });
    //check if user exists
    if (!userFind) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    //compare password
    if (!(await userModel.comparePassword(password, userFind.password))) {
      if (userFind.sessionAttempts > 0) {
        userFind.sessionAttempts--;
      }
      const updatedUser = await userFind.save();

      if (userFind.sessionAttempts <= 0) {
        return res.status(401).json({
          message: `Cuenta bloqueada`,
        });
      }

      return res.status(401).json({
        message: `Clave incorrecta / Intentos restantes: ${userFind.sessionAttempts}`,
      });
    }

    if (userFind.sessionAttempts <= 0) {
      return res.status(401).json({
        message: `Cuenta bloqueada`,
      });
    }

    //if user logs in we reset sessionAttemtps to 3
    userFind.sessionAttempts = 3;
    const updatedUser = await userFind.save();
    //if login is successful we create a token with user data
    const token = jwt.sign(
      {
        id: userFind._id,
        name: userFind.name,
        lastName: userFind.lastName,
        role: userFind.role,
        plan: userFind.plan,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .header("authorization", token)
      .json({ message: "successful login", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
