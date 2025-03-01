const chatroomModel = require("../models/chatroom");
const userModel = require("../models/users");
const messageModel = require("../models/message");

const createChatroom = async (req, res) => {
  try {
    const { name } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) {
      res.status(400).json({ message: "Nombre de Chat Invalido" });
    }

    const chatroomExist = await chatroomModel.findOne({ name });

    if (chatroomExist) {
      res.status(409).json({ message: "Nombre de Chat ya existe" });
    }

    const chatroom = new chatroomModel({
      name,
    });

    await chatroom.save();

    res.status(201).json({ chatroom, message: "Chat creado con exito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createChatroom };
