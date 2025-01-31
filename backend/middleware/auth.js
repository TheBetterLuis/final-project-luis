const jwt = require("jsonwebtoken");
const userModel = require("../models/users");

function auth(roles = []) {
  return async function (req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({ message: "Token no fue enviado" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      //      console.log(decoded);
      const userFind = await userModel.findById(decoded.id);
      if (!userFind) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // console.log(userFind.role);
      if (!roles.includes(userFind.role)) {
        return res.status(401).json({ message: "Acceso no autorizado" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token invalido" });
    }
  };
}
module.exports = { auth };
