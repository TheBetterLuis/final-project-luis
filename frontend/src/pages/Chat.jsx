import io from "socket.io-client";
import NavBar from "../components/NavBar";
import PageFooter from "../components/Footer";
import { useState, useEffect } from "react";
const socket = io("/");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handlesubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("message", reciveMessage);
    return () => {
      socket.off("message", reciveMessage);
    };
  }, []);

  const reciveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center w-full h-full bg-gradient-to-b from-azul4 via-azul3 to-azul1 ">
        <div className="flex flex-row w-full h-screen">
          <div className="hidden sm:block sm:w-1/6 sm:h-full">
            <div className="flex flex-col bg-white/40 border-r-2 border-gray-400 w-full h-full justify-start items-center">
              <br />
              <div className="relative rounded-full overflow-hidden border-2 border-azul4 shadow-2xl">
                <img
                  src="../../public/img/persona3.avif"
                  alt=""
                  className="object-cover h-36 w-36 drop-shadow-2xl"
                />
              </div>
              <br />
              <div className="flex flex-col space-y-4">
                <button className="bg-azul4 text-white px-6 py-3 rounded-lg drop-shadow-lg hover:-translate-y-1 hover:scale-110  duration-300  ">
                  Pedro Herrera
                </button>
                <button className="bg-azul4 text-white px-6 py-3 rounded-lg drop-shadow-lg hover:-translate-y-1 hover:scale-110  duration-300  ">
                  Chat
                </button>
                <button className="bg-azul4 text-white px-6 py-3 rounded-lg drop-shadow-lg hover:-translate-y-1 hover:scale-110  duration-300  ">
                  Tickets
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full h-full">
            <form
              onSubmit={handlesubmit}
              className="flex flex-col w-full h-full justify-between"
            >
              <div className="flex flex-col-reverse  w-full h-full">
                <ul className="h-full flex flex-col justify-end overflow-y-auto p-2">
                  {messages.map((message, index) => (
                    <li
                      key={index}
                      className={`my-2 p-2 table text-sm rounded-md ${
                        message.from === "Me"
                          ? "bg-azul3 ml-auto"
                          : "bg-azul4 mr-auto"
                      }`}
                    >
                      <b>{message.from}</b>:{message.body}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-row justify-between items-center z-10 w-full h-16 bg-azul3 rounded">
                <input
                  className="w-full h-4/6 p-2 text-black border-2 border-azul4 rounded-lg"
                  type="text"
                  placeholder="Escribe tu mensaje"
                  onChange={(e) => setMessage(e.target.value)}
                  autoFocus
                />
                <button className="bg-azul4 text-white px-6 py-3 rounded-lg drop-shadow-lg hover:-translate-y-1 hover:scale-110  duration-300">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <PageFooter />
    </>
  );
};

export default Chat;
