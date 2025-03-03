import { Button } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import Tarjeta from "../components/Tarjeta";
import CustomSidebar from "../components/CustomSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import OtroSidebar from "../components/OtroSidebar";

const PublicProfilePage = () => {
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

  const { userID } = useParams();

  const fetchProfilePosts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/posts/paginate/publicprofile?page=${page}`,
        { userID: userID }
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
      <div className={`${styles.background}`}>
        <div
          id="wrapper"
          className="pt-10 pb-28 min-h-screen flex flex-col items-center justify-center"
        >
          <div className="relative z-40">
            <NavBar />
          </div>
          <div className="grid place-items-center py-2 font-roboto mt-20">
            {/*COMPONENT GOES HERE*/}
            {userData && viewedUserData && (
              <div className="relative z-10 grid place-items-center">
                {userData.role !== "admin" && userData.role !== "tech" && (
                  <Tarjeta className="relative " userData={viewedUserData} />
                )}

                {(userData.role === "admin" || userData.role === "tech") && (
                  <Tarjeta
                    className="relative "
                    showRole={true}
                    userData={viewedUserData}
                  />
                )}
              </div>
            )}
            {userData &&
              (userData.role === "admin" || userData.role === "tech") && (
                <>
                  <Button
                    className=" md:block md:top-40 md:left-28 lg:left-32 xl:left-72  2xl:left-96 bg-azul4 absolute top-40 left-60 top-20 left-20 sm:left-40 z-10"
                    onClick={() => {
                      navigate(`/invoices/${userID}/`);
                    }}
                  >
                    Facturas
                  </Button>
                </>
              )}

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
    </>
  );
};

export default PublicProfilePage;
