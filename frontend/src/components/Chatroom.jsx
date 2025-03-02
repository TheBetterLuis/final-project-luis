import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const PrivateChat = ({ roomId, username }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Join the specific room
    socket.emit("join_room", roomId);

    // Receive previous messages
    socket.on("previous_messages", (previousMessages) => {
      setMessages(previousMessages);
    });

    // Listen for messages in this room
    socket.on("private_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("previous_message");
      socket.off("private_message");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const messageData = { roomId, message: `${username}: ${input}` };
    socket.emit("private_message", messageData);
    setInput(""); // Clear input field
  };

  return (
    <div>
      <h3>Sala De Chat: {roomId}</h3>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default PrivateChat;
