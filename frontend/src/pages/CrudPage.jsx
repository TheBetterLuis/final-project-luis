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
  const [currentPage, setCurrentPage] = useState("users");
  const [pageData, setPageData] = useState();
  const [error, setError] = useState();
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
    fetchUsers("users");
  }, [navigate]);

  const fetchUsers = async (usersToFetch) => {
    let url = "";

    if (usersToFetch === "users") {
      url = "http://localhost:3001/api/users/regular/paginate?page=1";
    }

    if (usersToFetch === "tech") {
      url = "http://localhost:3001/api/users/tech/paginate?page=1";
    }

    try {
      const response = await axios.get(url);
      setPageData(response.data.users);
      console.log(response.data);
    } catch (err) {
      console.error("Error al cargar los usuarios", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la carga de posts"
      );
    } finally {
      setCurrentPage(usersToFetch);
    }
  };

  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar />
        <div
          id="wrapper"
          className="pt-24 pb-28 min-h-screen flex flex-col items-center justify-center"
        >
          {/*Page Component goes here*/}

          <div className="flex h-screen w-full  mt-16 mb-24">
            <div className="flex flex-col w-full h-screen justify-evenly items-center">
              <div className="flex flex-row justify-center items-center space-x-4 sm:space-x-80">
                <button
                  className="bg-azul4 text-white px-10 py-3 sm:px-20 sm:py-6 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg my-6"
                  onClick={() => {
                    fetchUsers("users");
                  }}
                >
                  Usuarios
                </button>
                <button
                  className="bg-azul4 text-white px-10 py-3 sm:px-20 sm:py-6 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg my-6
                "
                  onClick={() => {
                    fetchUsers("tech");
                  }}
                >
                  Tecnicos
                </button>
              </div>
              <CRUD
                view={currentPage}
                data={pageData}
                fetchUsers={fetchUsers}
              />
            </div>
          </div>

          {/*Page Component goes here*/}
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

export default CrudPage;
