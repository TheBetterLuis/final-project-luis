const userModel = require("../models/users");
//install JSON WEB TOKEN (JWT) : npm i jsonwebtoken

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFind = await userModel.findOne({ email });
    //check if user exists
    if (!userFind) {
      return res.status(404).json({ message: "user not found" });
    }
    //compare password
    if (!(await userModel.comparePassword(password, userFind.password))) {
      return res.status(404).json({ message: "invalid data" });
    }

    //if login is successful we create a token with user data
    const token = jwt.sign(
      { id: userFind._id, name: userFind.name },
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
