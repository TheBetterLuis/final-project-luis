import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import TicketView from "../components/TicketView";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const FeedPage = () => {
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
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("tokenSesion");
      if (!token) {
        navigate("/login");
      }

      const decoded = jwtDecode(token);
      setUserData(decoded);
      const techID = decoded.id;
      const userName = decoded.name;
      const userLastName = decoded.lastName;
      const userRole = decoded.role;

      const expiry = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (expiry < currentTime) {
        console.log("token has expired");
        localStorage.removeItem("tokenSesion");
        navigate("/login");
      }
    };
    fetchInfo();
  }, [navigate]);

  return (
    <>
      <div className={` flex flex-col min-h-screen ${styles.background}`}>
        <NavBar />
        <div className="grid place-items-center py-2 font-roboto">
          {/*COMPONENT GOES HERE*/}
          <TicketView />
          <TicketView />
        </div>
        <PageFooter />
      </div>
      <CustomSidebar
        name={userData.name}
        lastName={userData.lastName}
        image={userData.profilePicture}
      />
    </>
  );
};

export default FeedPage;
