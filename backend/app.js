//require dotenv to use variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { dbConnect } = require("./config/mongo");

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

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("private_message", ({ roomId, message }) => {
    console.log(`Message in room ${roomId}`, message);

    io.to(roomId).emit("private_message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("api is ready");
  console.log(`Server running on port ${PORT}`);
});
