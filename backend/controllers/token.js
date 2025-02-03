const jwt = require("jsonwebtoken");

const decodeToken = async (req, res) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Token no enviado" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token invalido" });
      }

      res.json({ user: decoded });
    });
  } catch (error) {
    console.error("General error in /api/token", error);
    res.status(500).json({ message: "Un error ha ocurrido" });
  }
};

module.exports = { decodeToken };
