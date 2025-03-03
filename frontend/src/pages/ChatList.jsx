import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import PrivateChat from "../components/Chatroom";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Button } from "flowbite-react";
import OtroSidebar from "../components/OtroSidebar";

const ChatList = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  let returnPage = (
    <>
      <div className={`${styles.background}`}>
        <NavBar />
        <div
          id="wrapper"
          className="pt-24 pb-28 min-h-screen flex flex-col items-center justify-center"
        >
          {/*Page Component goes here*/}

          <div className="flex flex-col items-center ">
            <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-md">
              Error al cargar lista de usuarios
            </span>
            <Link to={"/feed"}>
              <button
                type="button"
                className="group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 bg-azul2 text-gray-100 rounded w-36 h-12 drop-shadow-lg hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm">
                  Volver al Feed
                </span>
              </button>
            </Link>
          </div>

          {/*Page Component goes here*/}
        </div>
        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );

  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/users/premium/paginate?page=${page}`
      );
      setListData((prevUsers) => [...prevUsers, ...response.data.users]);
      setTotalPages(response.data.totalPages);

      setSuccess(true);
    } catch (err) {
      console.error("Error al cargar usuarios", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la carga de usuarios"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("tokenSesion");
      if (!token) {
        navigate("/login");
      }

      const decoded = jwtDecode(token);
      setUserData(decoded);

      const userRole = decoded.role;

      const expiry = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (expiry < currentTime) {
        console.log("token has expired");
        localStorage.removeItem("tokenSesion");
        navigate("/login");
      }

      if (userRole !== "admin" && userRole !== "tech") {
        console.log("no sos admin o tech");
        navigate("/login");
      }
    };

    fetchInfo();
    fetchUsers(1);
  }, [navigate]);

  const loadNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchUsers(currentPage + 1);
    console.log("loaded more");
  };

  if (success) {
    returnPage = (
      <>
        <div className={`${styles.background}`}>
          <NavBar />
          <div
            id="wrapper"
            className="pt-24 pb-28 min-h-screen flex flex-col items-center justify-center"
          >
            {/*Page Component goes here*/}

            {listData !== null && userData !== null && (
              <>
                {listData.map((user) => (
                  <>
                    <div key={user._id}>
                      <Link to={`/chatroom_tech/${user._id}`}>
                        <div
                          className={`capitalize my-1 cursor-pointer rounded-md px-4 py-2 text-md ${
                            user.isOnline === true
                              ? "bg-green-500"
                              : "bg-red-500"
                          } `}
                        >
                          {`${user.name} ${user.lastName}`}
                        </div>
                      </Link>
                    </div>
                  </>
                  /*
                  <>
                    <div key={user._id}>
                      <Link to={`/chatroom_tech/${user._id}`}>
                        <h1
                          className={`capitalize my-1 cursor-pointer ${
                            user.isOnline === true
                              ? "bg-green-500"
                              : "bg-red-500"
                          } `}
                        >{`${user.name} ${user.lastName}`}</h1>
                      </Link>
                    </div>
                  </>
                  */
                ))}
              </>
            )}
            {currentPage < totalPages ? (
              <Button
                className="bg-azul2 drop-shadow-md "
                onClick={loadNextPage}
              >
                Cargar mas usuarios
              </Button>
            ) : (
              <Button className="bg-gray-400 drop-shadow-md">
                No hay mas usuarios disponibles
              </Button>
            )}

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
  }

  return returnPage;
};

export default ChatList;
