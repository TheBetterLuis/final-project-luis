import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Card } from "flowbite-react";
import { FaHeart, FaCommentDots } from "react-icons/fa";

import { formatDate } from "../../common/utils";

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
              <span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-md">
                Error al cargar ticket
              </span>
              <Link to={"/feed"}>
                <button
                  type="button"
                  class="group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 bg-azul2 text-gray-100 rounded w-36 h-12 drop-shadow-lg hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  <span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm">
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
    //679bb894e660b4fcf8674b9e
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

  if (success) {
    returnPage = (
      <>
        <div className={` flex flex-col min-h-screen ${styles.background}`}>
          <NavBar />
          <div className="grid place-items-center py-2 font-roboto">
            {/*COMPONENT GOES HERE*/}
            <div className="rounded-lg   mb-4">
              <Card className="max-w-sm bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
                <div className="flex gap-3">
                  <img
                    className="rounded-full border border-azul5 w-20 h-20 dark:border-white"
                    src={postData.userID.profilePicture}
                    alt={`foto de perfil de ${postData.userID.name} ${postData.userID.lastName}`}
                  />
                  <span className="text-sm text-gray-700 flex items-center justify-center drop-shadow-md dark:text-white capitalize">
                    {` ${postData.userID.name} ${postData.userID.lastName}`}
                  </span>
                </div>
                <Card className="max-w-sm bg-teal-500  bg-opacity-30 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-black drop-shadow-2xl shadow-2xl">
                  <form className="flex max-w-md flex-col gap-4 ">
                    <div>
                      <div className="mb-2 block">
                        <span className="text-black flex items-center justify-center drop-shadow-md dark:text-white">
                          {postData.ticketID.title}
                        </span>
                      </div>
                    </div>
                    <div class="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs h-32 overflow-y-auto">
                      <p class="text-black dark:text-gray-400">
                        {postData.ticketID.description}
                      </p>
                    </div>
                    <div class="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs w-20 text-center">
                      <p class="text-black dark:text-gray-400">
                        {formatDate(postData.ticketID.createdAt)}
                      </p>
                    </div>
                    <img
                      src={postData.ticketID.image}
                      alt=" "
                      className="mb-4"
                    />
                  </form>
                </Card>
                <div className="flex justify-between">
                  <FaHeart
                    size={26}
                    className="dark:text-white hover:text-red-500 dark:hover:text-red-500  cursor-pointer"
                  />
                  <FaCommentDots
                    size={26}
                    className="text-white hover:text-black dark:hover:text-gray-400 cursor-pointer"
                  />
                </div>
              </Card>
            </div>
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
