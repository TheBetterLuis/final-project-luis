import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LogoutPage = () => {
  const [response, setResponse] = useState([]);
  const navigate = useNavigate();

  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1 ",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("tokenSesion");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const id = decoded.id;

          const request = await axios.post("http://localhost:3001/api/logout", {
            id: id,
          });
          setResponse(request.data);
        } catch (e) {
          console.error("invalid token");
        }
      }
      localStorage.removeItem("tokenSesion");
    };

    fetchInfo();
  }, [navigate]);

  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar />
        <div className="flex h-screen w-full  overflow-y-scroll ">
          <div className="flex justify-center items-center h-screen w-full font-roboto overflow-y-scroll ">
            {/*COMPONENT GOES HERE*/}
            <div className="flex flex-col items-center">
              <span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-md">
                {response.message || "Sesión cerrada exitosamente"}
              </span>
              <Link to={"/login"}>
                <button
                  type="button"
                  class="group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 bg-azul2 text-gray-100 rounded w-36 h-12 drop-shadow-lg hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  <span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm">
                    Iniciar Sesion
                  </span>
                </button>
              </Link>
            </div>
            {/*COMPONENT GOES HERE*/}
          </div>
        </div>
        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );
};

export default LogoutPage;
