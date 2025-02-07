import { Button } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import TicketView from "../components/TicketView";
import PageFooter from "../components/Footer";
import Tarjeta from "../components/Tarjeta";
import CustomSidebar from "../components/CustomSidebar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const ProfilePage = () => {
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
      if (token) {
        try {
          const decoded = jwtDecode(token);
          //  console.log(decoded);
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
        } catch (e) {
          console.error("invalid token");
        }
      } else {
        navigate("/login");
      }
    };

    fetchInfo();
  }, [navigate]);

  return (
    <>
      <div className={`${styles.background_feed}`}>
        <div className="relative z-20">
          <NavBar />
        </div>
        <div
          className={`${styles.background} fixed top-0 left-0 w-screen h-1/4 z-1 `}
        ></div>
        <div className="grid place-items-center py-2 font-roboto mt-20">
          {/*COMPONENT GOES HERE*/}
          <div className="relative z-20 grid place-items-center">
            <Tarjeta className="relative " userData={userData} />
          </div>
          <Button className=" md:block md:top-40 md:left-28 lg:left-32 xl:left-72  2xl:left-96 bg-azul4 absolute top-40 left-60 top-20 left-20 sm:left-40 z-10">
            Plan
          </Button>
          <Button className="md:block md:top-40 md:right-16 lg:right-32 xl:right-52 2xl:right-96 bg-azul4 absolute top-40 right-[300px] top-20 right-20 sm:right-40 z-10">
            Configuracion
          </Button>
          <TicketView />
          <TicketView />
        </div>
        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );
};

export default ProfilePage;
