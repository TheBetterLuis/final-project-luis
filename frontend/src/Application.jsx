import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./components/Test";
import PageFooter from "./components/Footer";
import { DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";
import Login from "./components/Login";
import Register from "./components/Register";
import Ticket from "./components/Ticket";
import SideBar from "./components/SideBar";
import TicketList from "./components/TicketList";
import TicketView from "./components/TicketView";
import Tarjeta from "./components/Tarjeta";
import TestPage from "./pages/TestPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import DashboardPage from "./pages/DashboardPage";
import CrudPage from "./pages/CrudPage";

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
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  return (
    <>
      <Flowbite>
        {/*        <div
          className={`${styles.background} grid place-items-center py-2 font-roboto`}
        >*/}
        <Routes>
          {/*Pages */}

          <Route path="/" element={<LandingPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/createTicket" element={<CreateTicketPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/crud" element={<CrudPage />} />

          <Route path="/*" element={<>not found</>} />
        </Routes>
        {/*        <div className="grid place-items-center my-2">
          <DarkThemeToggle />
        </div>
 */}
      </Flowbite>
    </>
  );
};

export default Application;
