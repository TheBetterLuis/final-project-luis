import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import TicketView from "../components/TicketView";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { Card } from "flowbite-react";
import { FaHeart, FaCommentDots } from "react-icons/fa";

const TicketViewPage = () => {
  /*
    colors: {
      azul1: "#9CFFE5",
      azul2: "#6C9DFF",
      azul3: "#4491A1",
      azul4: "#074572",
      azul5: "#0B2545",
      azul6: "#00171F",
    }
    */
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const { ticketID } = useParams();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({});
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
      const techID = decoded.id;
      const userName = decoded.name;
      const userLastName = decoded.lastName;
      const userRole = decoded.role;

      const expiry = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (expiry < currentTime) {
        console.log("token has expired");
        localStorage.removeItem("tokenSesion");
        navigate("/login");
      }
    };

    const fetchTicket = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/tickets/${ticketID}`
        );
        console.log("Ticket recibido:", response.data);
        setTicketData(response.data[0]);
        // navigate("/feed");
      } catch (err) {
        console.error("Error al cargar el ticket", err);
        setError(
          err.response?.data?.message ||
            "Ha ocurrido un error durante la carga del ticket"
        );
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
    fetchTicket();
  }, [navigate, ticketID]);

  return (
    <>
      <div className={` flex flex-col min-h-screen ${styles.background}`}>
        <NavBar />
        <h1>{ticketData._id}</h1>
        <div className="grid place-items-center py-2 font-roboto">
          {/*COMPONENT GOES HERE*/}
          <div className="rounded-lg   mb-4">
            <Card className="max-w-sm bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
              <div className="flex gap-3">
                <img
                  className="rounded-full border border-azul5 w-20 dark:border-white"
                  src="../../public/vite.svg"
                  alt="foto de perfil de Juan"
                />
                <span className="text-sm text-gray-700 flex items-center justify-center drop-shadow-md dark:text-white">
                  Juan Hernandez
                </span>
              </div>
              <Card className="max-w-sm bg-teal-500  bg-opacity-30 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-black drop-shadow-2xl shadow-2xl">
                <form className="flex max-w-md flex-col gap-4 ">
                  <div>
                    <div className="mb-2 block">
                      <span className="text-black flex items-center justify-center drop-shadow-md dark:text-white">
                        Internet lento
                      </span>
                    </div>
                  </div>
                  <div class="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs h-32 overflow-y-auto">
                    <p class="text-black dark:text-gray-400">
                      This is an example of a paragraph element styled with
                      Flowbite. You can easily customize the appearance of this
                      paragraph by adding utility classes from Tailwind CSS.
                      This is an example of a paragraph element styled with
                      Flowbite. You can easily customize the appearance of this
                      paragraph by adding utility classes from Tailwind CSS.
                      This is an example of a paragraph element styled with
                      Flowbite. You can easily customize the appearance of this
                      paragraph by adding utility classes from Tailwind CSS.
                      This is an example of a paragraph element styled with
                      Flowbite. You can easily customize the appearance of this
                      paragraph by adding utility classes from Tailwind CSS.
                    </p>
                  </div>
                  <div class="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs w-20 text-center">
                    <p class="text-black dark:text-gray-400">26/1/2025</p>
                  </div>
                  <img
                    src="../../public/vite.svg"
                    alt="Meaningful alt text for an image that is not purely decorative"
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
};

export default TicketViewPage;
