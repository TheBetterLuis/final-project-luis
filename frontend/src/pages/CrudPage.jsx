import CRUD from "../components/CRUD";
import { NavBar } from "../components/NavBar";
import { Button } from "flowbite-react";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import OtroSidebar from "../components/OtroSidebar";

const CrudPage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const [error, setError] = useState();
  const [userData, setUserData] = useState({});
  const [currentPage, setCurrentPage] = useState("users");
  const [pageData, setPageData] = useState();

  const [usersPageData, setUsersPageData] = useState([]);
  const [techsPageData, setTechsPageData] = useState([]);

  const [totalPagesUsers, setTotalPagesUsers] = useState(0);
  const [totalPagesTechs, setTotalPagesTechs] = useState(0);

  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageTechs, setCurrentPageTechs] = useState(1);

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
    fetchUSERS(1);
    fetchTECHS(1);
  }, [navigate]);

  useEffect(() => {
    if (usersPageData.length > 0) {
      setPageData(usersPageData);
    }
  }, [usersPageData]);

  const fetchUSERS = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/users/regular/paginate?page=${page}`
      );

      setUsersPageData((prevInfo) => [...prevInfo, ...response.data.users]);
      setTotalPagesUsers(response.data.totalPages);
    } catch (err) {
      console.error("Error al cargar usuarios", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la carga de usuarios"
      );
    }
  };

  const fetchTECHS = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/users/tech/paginate?page=${page}`
      );

      setTechsPageData((prevInfo) => [...prevInfo, ...response.data.users]);
      setTotalPagesTechs(response.data.totalPages);
      console.log("updated tech data", response.data.users);
    } catch (err) {
      console.error("Error al cargar tecnicos", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la carga de tecnicos"
      );
    }
  };

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

  const loadNextUserPage = () => {
    setCurrentPageUsers((prevPage) => prevPage + 1);
    fetchUSERS(currentPageUsers + 1);
    console.log("loaded more users");
  };

  const loadNextTechPage = () => {
    setCurrentPageTechs((prevPage) => prevPage + 1);
    fetchTECHS(currentPageTechs + 1);
    console.log("loaded more techs");
  };

  return (
    <>
      <div className={`${styles.background}`}>
        <div className="relative z-40">
          <NavBar />
        </div>

        <div
          id="wrapper"
          className="pt-24 pb-28 px-9 py-9 min-h-screen flex flex-col items-center justify-center"
        >
          {/*Page Component goes here*/}

          <div className="flex h-screen w-full  mt-16 mb-24">
            <div className="flex flex-col w-full h-screen justify-evenly items-center">
              <div className="flex flex-row justify-center items-center space-x-4 sm:space-x-80">
                <button
                  className="bg-azul4 text-white px-10 py-3 sm:px-20 sm:py-6 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg my-6"
                  onClick={() => {
                    setPageData(usersPageData);
                    setCurrentPage("users");
                  }}
                >
                  Usuarios
                </button>
                <button
                  className="bg-azul4 text-white px-10 py-3 sm:px-20 sm:py-6 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg my-6
                "
                  onClick={() => {
                    setPageData(techsPageData);
                    setCurrentPage("tech");
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
              {currentPage === "users" && (
                <>
                  {currentPageUsers < totalPagesUsers ? (
                    <Button
                      className="bg-azul2 drop-shadow-md mt-4"
                      onClick={loadNextUserPage}
                    >
                      Cargar mas usuarios
                    </Button>
                  ) : (
                    <Button className="bg-gray-400 drop-shadow-md mt-4">
                      No hay mas usuarios disponibles
                    </Button>
                  )}
                </>
              )}

              {currentPage === "tech" && (
                <>
                  {currentPageTechs < totalPagesTechs ? (
                    <Button
                      className="bg-azul2 drop-shadow-md mt-4"
                      onClick={() => {
                        loadNextTechPage();
                        setPageData(techsPageData);
                      }}
                    >
                      Cargar mas tecnicos
                    </Button>
                  ) : (
                    <Button className="bg-gray-400 drop-shadow-md mt-4">
                      No hay mas tecnicos disponibles
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {/*Page Component goes here*/}
        </div>
        <PageFooter />
      </div>
      {userData !== null && (
        <>
          {userData.role === "admin" && (
            <OtroSidebar
              buttons={[
                { name: "Perfil", link: "/profile" },
                { name: "Feed", link: "/feed" },
                { name: "Dashboard", link: "/dashboard" },
                { name: "CRUD", link: "/crud" },
                { name: "Lista De Chats", link: "/chatlist" },
                { name: "Reportar Ticket", link: "/createticket" },
                { name: "Cerrar Sesion", link: "/logout" },
              ]}
              userData={userData}
            />
          )}

          {userData.role === "tech" && (
            <OtroSidebar
              buttons={[
                { name: "Perfil", link: "/profile" },
                { name: "Feed", link: "/feed" },
                { name: "Dashboard", link: "/dashboard" },
                { name: "Lista De Chats", link: "/chatlist" },
                { name: "Reportar Ticket", link: "/createticket" },
                { name: "Cerrar Sesion", link: "/logout" },
              ]}
              userData={userData}
            />
          )}

          {userData.role === "free" && (
            <OtroSidebar
              buttons={[
                { name: "Perfil", link: "/profile" },
                { name: "Feed", link: "/feed" },
                { name: "Reportar Ticket", link: "/createticket" },
                { name: "Cerrar Sesion", link: "/logout" },
              ]}
              userData={userData}
            />
          )}

          {userData.role === "premium" && (
            <OtroSidebar
              buttons={[
                { name: "Perfil", link: "/profile" },
                { name: "Feed", link: "/feed" },
                { name: "Chat", link: "/chatroom" },
                { name: "Reportar Ticket", link: "/createticket" },
                { name: "Cerrar Sesion", link: "/logout" },
              ]}
              userData={userData}
            />
          )}
        </>
      )}

      {userData === null && (
        <>
          <OtroSidebar
            buttons={[
              { name: "Perfil", link: "/profile" },
              { name: "Feed", link: "/feed" },
              { name: "Reportar Ticket", link: "/createticket" },
              { name: "Cerrar Sesion", link: "/logout" },
            ]}
          />
        </>
      )}
    </>
  );
};

export default CrudPage;
