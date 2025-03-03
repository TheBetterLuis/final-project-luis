import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Button } from "flowbite-react";
import OtroSidebar from "../components/OtroSidebar";

const FeedPage = () => {
  const styles = {
    background: "bg-gradient-to-r from-azul3  to-azul1",
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
          className="pt-24 pb-28 min-h-screen flex flex-col items-center justify-center wrapper"
        >
          {/*Page Component goes here*/}

          <div className="flex flex-col items-center ">
            <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-md">
              Error al cargar posts
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
  const [postsData, setPostsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/posts/paginate?page=${page}`
      );
      console.log(response.data.posts);
      setPostsData((prevPosts) => [...prevPosts, ...response.data.posts]);
      setTotalPages(response.data.totalPages);

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
      if (!token) {
        navigate("/login");
      }

      const decoded = jwtDecode(token);
      setUserData(decoded);

      const expiry = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (expiry < currentTime) {
        console.log("token has expired");
        localStorage.removeItem("tokenSesion");
        navigate("/login");
      }
    };

    fetchInfo();
    fetchPosts(1);
  }, [navigate]);

  const loadNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchPosts(currentPage + 1);
    console.log("loaded more");
  };

  useEffect(() => {
    if (userData && postsData) {
      console.log(userData);
      console.log(postsData);
    }
  }, [userData]);

  if (success) {
    returnPage = (
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

            {postsData !== null && userData !== null && (
              <>
                {postsData.map((postData) => (
                  <>
                    <Post
                      key={postData._id}
                      data={postData}
                      userData={userData}
                    />
                  </>
                ))}
              </>
            )}
            {currentPage < totalPages ? (
              <Button
                className="bg-azul2 drop-shadow-md "
                onClick={loadNextPage}
              >
                Cargar mas posts
              </Button>
            ) : (
              <Button className="bg-gray-400 drop-shadow-md">
                No hay mas posts disponibles
              </Button>
            )}

            {/*Page Component goes here*/}
          </div>
          <PageFooter />
        </div>
        {/*
        <CustomSidebar
          name={userData.name}
          lastName={userData.lastName}
          image={userData.profilePicture}
        />
        */}
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

export default FeedPage;
