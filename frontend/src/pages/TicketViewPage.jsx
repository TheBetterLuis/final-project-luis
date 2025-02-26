import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const TicketViewPage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  let returnPage = (
    <>
      <div className={`${styles.background}`}>
        <NavBar />
        <div className="flex h-screen w-full  overflow-y-scroll ">
          <div className="flex justify-center items-center h-screen w-full font-roboto overflow-y-scroll ">
            {/*COMPONENT GOES HERE*/}
            <div className="flex flex-col items-center">
              <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-md">
                Error al cargar ticket
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
          </div>
        </div>
        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );

  const { ticketID } = useParams();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [postData, setPostData] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/posts/${ticketID}`
        );
        console.log("Post recibido:", response.data);
        setPostData(response.data[0]);
        setSuccess(true);
      } catch (err) {
        console.error("Error al cargar el ticket", err);
        setError(
          err.response?.data?.message ||
            "Ha ocurrido un error durante la carga del ticket"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
    fetchPost();
  }, [navigate, ticketID]);

  if (
    success &&
    (postData.status === "public" ||
      userData.id === postData.userID._id ||
      userData.role === "admin" ||
      userData.role === "tech")
  ) {
    returnPage = (
      <>
        <div className={` flex flex-col min-h-screen ${styles.background}`}>
          <NavBar />
          <div
            id="wrapper"
            className="pt-24 pb-28 min-h-screen flex flex-col items-center justify-center"
          >
            {/*Page Component goes here*/}
            <Post data={postData} userData={userData} />
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
  }

  return returnPage;
};

export default TicketViewPage;
