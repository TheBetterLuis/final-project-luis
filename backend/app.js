//require dotenv to use variables
require("dotenv").config();

const Message = require("./models/message");

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { dbConnect } = require("./config/mongo");
const { timeStamp } = require("console");

dbConnect();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/", require("./routes"));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("join_room", async (roomId) => {
    try {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);

      const previousMessages = await Message.find({ roomId })
        .sort({
          timestamp: 1,
        })
        .exec();

      socket.emit("previous_messages", previousMessages);
    } catch (error) {
      console.error("Error fetching previous messages", error);
      socket.emit("error", "Failed to load previous messages");
    }
  });

  socket.on("private_message", async ({ roomId, message }) => {
    // console.log(`Message in room ${roomId}`, message);
    try {
      const newMessage = new Message({ roomId, message });
      await newMessage.save();
      console.log(`Message saved in room ${roomId}`, newMessage);

      io.to(roomId).emit("private_message", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", "Failed to send message");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("api is ready");
  console.log(`Server running on port ${PORT}`);
});
