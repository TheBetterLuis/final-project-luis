const jwt = require("jsonwebtoken");
const userModel = require("../models/users");

function auth(roles = []) {
  return async function (req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({ message: "token wasn't sent" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      const userFind = await userModel.findById(decoded.id);
      if (!userFind) {
        return res.status(404).json({ message: "user not found" });
      }
      // console.log(userFind.role);
      if (!roles.includes(userFind.role)) {
        return res.status(401).json({ message: "unauthorized access" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "invalid token" });
    }
  };
}
module.exports = { auth };
