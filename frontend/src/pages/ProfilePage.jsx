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

const ProfilePage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const [userData, setUserData] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = async (userID) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/posts/user`,
        { userID }
      );
      setPostsData(response.data);
      //      console.log(response);
    } catch (err) {
      console.error("Error al cargar posts", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la carga de posts"
      );
    } finally {
      setLoading(false);
      setSuccess(true);
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

          fetchPosts(decoded.id);
        } catch (e) {
          console.error("invalid token");
        }
      } else {
        navigate("/login");
      }
    };

    fetchInfo();
  }, [navigate]);

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
              <Post data={post} userData={userData} />
            ))}
          </>
        )}
      </>
    );
  }

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
          {pageContent}
        </div>
        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );
};

export default ProfilePage;
