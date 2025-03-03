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
    <div className="p-4 bg-gray-100 max-w-md mx-auto rounded shadow">
      <h3 className="text-lg font-bold mb-4 text-center text-gray-800">
        Sala De Chat
      </h3>
      <div className="bg-white p-3 rounded shadow-inner max-h-60 overflow-y-auto">
        {messages.map((msg, index) => (
          <p key={index} className="mb-2 text-sm text-gray-700 break-words">
            {msg.message}
          </p>
        ))}
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 text-sm"
          placeholder="Escribe tu mensaje aquí..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white font-semibold text-sm rounded hover:bg-blue-600 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
  /*
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
  */
};

export default PrivateChat;
