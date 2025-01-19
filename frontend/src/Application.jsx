import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./components/Test";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import Login from "./components/Login";
import Register from "./components/Register";
import Ticket from "./components/Ticket";
import TicketList from "./components/TicketList";

/*
    colors: {
      azul1: "#9CFFE5",
      azul2: "#6C9DFF",
      azul3: "#4491A1",
      azul4: "#074572",
      azul5: "#0B2545",
      azul6: "#00171F",
    }
    */
const Application = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
  };

  return (
    <Flowbite>
      <div
        className={`${styles.background} grid place-items-center py-2 font-roboto`}
      >
        {/* */}
        <Routes>
          <Route path="/" element={<>Inicio</>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/ticketlist" element={<TicketList />} />
          <Route path="/*" element={<>not found</>} />
        </Routes>
      </div>
      <div className="grid place-items-center my-2">
        <DarkThemeToggle />
      </div>
    </Flowbite>
  );
};

export default Application;
