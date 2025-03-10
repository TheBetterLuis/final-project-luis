import { Button } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import Tarjeta from "../components/Tarjeta";
import CustomSidebar from "../components/CustomSidebar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import EditUserModal from "../components/EditUserModal";
import OtroSidebar from "../components/OtroSidebar";

const ProfilePage = () => {
  const styles = {
    background: "bg-gradient-to-r from-azul3  to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const [userData, setUserData] = useState(null);
  const [viewedUserData, setViewedUserData] = useState(null);
  const [postsData, setPostsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [modalData, setModalData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

  const prepareModal = async (user) => {
    setModalData(user);
    setOpenModal(true);
  };

  const handleCloseModal = async () => {
    setModalData(null);
    setMessage("");
    setOpenModal(false);
  };

  const handleMessage = async (message) => {
    setMessage(message);
  };

  const fetchProfilePosts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/posts/paginate/personalprofile?page=${page}`,
        { userID: userData.id }
      );
      setPostsData((prevPosts) => [...prevPosts, ...response.data.posts]);
      setTotalPages(response.data.totalPages);
      setViewedUserData({
        ...response.data.user,
        postCount: response.data.userPostCount,
        totalLikes: response.data.userTotalLikes,
      });

      setSuccess(true);
    } catch (err) {
      console.error("Error al cargar posts", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la carga de posts"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePaymentSession = async () => {
    try {
      const createSessionResponse = await axios.post(
        `http://localhost:3001/api/payments/create-checkout-session`
      );

      const session = createSessionResponse.data.session;
      window.location.href = session.url;
    } catch (err) {
      console.error("Error al crear sesion de pago", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la creacion de sesion de pago"
      );
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("tokenSesion");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserData(decoded);

          const expiry = decoded.exp;
          const currentTime = Date.now() / 1000;
          if (expiry < currentTime) {
            console.log("token has expired");
            localStorage.removeItem("tokenSesion");
            navigate("/login");
          }
        } catch (e) {
          console.error("invalid token", e.message);
        }
      } else {
        navigate("/login");
      }
    };

    fetchInfo();
  }, [navigate]);

  useEffect(() => {
    if (userData && userData.id) {
      fetchProfilePosts(1);
    }
  }, [userData]);

  const loadNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchProfilePosts(currentPage + 1);
    console.log("loaded more");
  };

  let pageContent = (
    <>
      {postsData === null && (
        <>
          <Button className="bg-gray-400 drop-shadow-md">
            <h1 className="text-2xl">No hay informacion disponible</h1>
          </Button>
        </>
      )}
    </>
  );

  if (success) {
    pageContent = (
      <>
        {postsData !== null && userData !== null && (
          <>
            {postsData.map((post, index) => (
              <Post key={index} data={post} userData={userData} />
            ))}
          </>
        )}
        {currentPage < totalPages ? (
          <Button className="bg-azul2 drop-shadow-md " onClick={loadNextPage}>
            Cargar mas posts
          </Button>
        ) : (
          <Button className="bg-gray-400 drop-shadow-md">
            No hay posts disponibles
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      <div className={`${styles.background} `}>
        <div
          id="wrapper"
          className="pt-10 pb-28 min-h-screen flex flex-col items-center justify-center "
        >
          <div className="relative z-40">
            <NavBar />
          </div>

          <div className="grid place-items-center py-2 font-roboto mt-20">
            {/*COMPONENT GOES HERE*/}
            {userData && viewedUserData && (
              <div className="relative z-10 grid place-items-center">
                <Tarjeta
                  className="relative "
                  userData={viewedUserData}
                  showRole={true}
                  profilePictureLink={true}
                />
              </div>
            )}

            {userData && userData.role === "free" && (
              <Button
                className=" md:block md:top-40 md:left-28 lg:left-32 xl:left-72  2xl:left-96 bg-azul4 absolute top-40 left-60 top-20 left-20 sm:left-40 z-10"
                onClick={() => {
                  handleCreatePaymentSession();
                }}
              >
                Plan
              </Button>
            )}
            <Button
              className="md:block md:top-40 md:right-16 lg:right-32 xl:right-52 2xl:right-96 bg-azul4 absolute top-40 right-[300px] top-20 right-20 sm:right-40 z-10"
              onClick={() => {
                prepareModal(userData);
              }}
            >
              Configuracion
            </Button>

            {pageContent}
          </div>
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

      <EditUserModal
        data={modalData}
        setOpenModal={setOpenModal}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleMessage={handleMessage}
        message={message}
        logout={true}
      />
    </>
  );
};

export default ProfilePage;
