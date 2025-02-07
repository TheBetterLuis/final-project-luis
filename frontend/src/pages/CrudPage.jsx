import CRUD from "../components/CRUD";
import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CrudPage = () => {
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
      const userRole = decoded.role;

      if (userRole !== "admin") {
        navigate("/login");
      }

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
      <div className={`${styles.background}`}>
        <NavBar />

        <div className="flex h-screen w-full  overflow-y-scroll mt-16 mb-24">
          <div className="flex flex-col w-full h-screen justify-evenly items-center">
            <div className="flex flex-row justify-center items-center space-x-4 sm:space-x-80">
              <button className="bg-azul4 text-white px-10 py-3 sm:px-20 sm:py-6 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg my-6">
                Usuarios
              </button>
              <button className="bg-azul4 text-white px-10 py-3 sm:px-20 sm:py-6 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg my-6">
                Tecnicos
              </button>
            </div>
            <CRUD />
          </div>
        </div>
        <PageFooter />
        <CustomSidebar />
      </div>
    </>
  );
};

export default CrudPage;
