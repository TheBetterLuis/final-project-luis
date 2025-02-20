const jwt = require("jsonwebtoken");
const { validateToken, removeToken } = require("../util/helpers");

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

const tokenValidation = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Token no enviado" });
    }

    const isValid = validateToken(token);

    if (!isValid) {
      return res
        .status(403)
        .json({ message: "Token Invalido", isValid: false });
    }

    return res.status(200).json({ message: "Token valido", isValid: true });
  } catch (error) {
    res.status(500).json({ message: "Un error ha ocurrido", error });
  }
};

const tokenRemoval = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Token no enviado" });
    }

    const result = removeToken(token);

    if (!result) {
      return res.status(403).json({ message: "Token invalido o ya eliminado" });
    }

    return res.status(200).json({ message: "Token eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Un error ha ocurrido", error });
  }
};

module.exports = { decodeToken, tokenValidation, tokenRemoval };
