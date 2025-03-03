import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import PrivateChat from "../components/Chatroom";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import OtroSidebar from "../components/OtroSidebar";
import { FaUser } from "react-icons/fa";

const ChatList = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  let returnPage = (
    <>
      <div className={`${styles.background}`}>
        <div className="relative z-40">
          <NavBar />
        </div>

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
          <div className="relative z-40">
            <NavBar />
          </div>
          <div
            id="wrapper"
            className="pt-24 pb-28 min-h-screen flex flex-col items-center justify-center wrapper"
          >
            {/*Page Component goes here*/}
            <button className="bg-azul4 text-white px-10 py-3 sm:px-16 sm:py-5 rounded-lg text-3xl   duration-300  drop-shadow-lg text-center my-3">
              Chats de Usuarios
            </button>
            <br />

            {listData !== null && userData !== null && (
              <>
                <Table>
                  <Table.Head>
                    <Table.HeadCell className="bg-white/60 font-bold text-lg text-center">
                      Usuario
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-white/60 font-bold text-lg text-center">
                      Estado
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y bg-white/30">
                    {listData.map((user) => (
                      <>
                        <Table.Row
                          className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70 cursor-pointer"
                          key={user._id}
                          onClick={() => {
                            navigate(`/chatroom_tech/${user._id}`);
                          }}
                        >
                          <Link to={`/chatroom_tech/${user._id}`}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200 font-bold uppercase">
                              {`${user.name} ${user.lastName}`}{" "}
                            </Table.Cell>
                          </Link>
                          <Table.Cell className="whitespace-nowrap  text-blue-700 dark:text-gray-200 font-bold ">
                            <FaUser
                              className={`${
                                user.isOnline === true
                                  ? "text-green-500"
                                  : "text-red-500"
                              } text-2xl mx-auto`}
                            />
                          </Table.Cell>
                        </Table.Row>
                      </>
                    ))}
                  </Table.Body>
                </Table>
              </>
            )}
            {currentPage < totalPages ? (
              <Button
                className="bg-azul2 drop-shadow-md mt-4"
                onClick={loadNextPage}
              >
                Cargar mas usuarios
              </Button>
            ) : (
              <Button className="bg-gray-400 drop-shadow-md mt-4">
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
