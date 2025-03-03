import CustomSidebar from "../components/CustomSidebar";
import PageFooter from "../components/Footer";
import PrivateChat from "../components/Chatroom";
import { NavBar } from "../components/NavBar";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OtroSidebar from "../components/OtroSidebar";

const ChatroomTechPage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1 ",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const { userID } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("tokenSesion");
      if (!token) {
        navigate("/login");
      }

      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
        const userRole = decoded.role;

        if (userRole !== "admin" && userRole !== "tech") {
          navigate("/login");
        }

        const expiry = decoded.exp;
        const currentTime = Date.now() / 1000;

        if (expiry < currentTime) {
          console.log("token has expired");
          localStorage.removeItem("tokenSesion");
          navigate("/login");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("tokenSesion");
        navigate("/login");
      }
    };
    fetchInfo();
  }, [navigate]);

  return (
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
          {userData !== null && userID && (
            <>
              <PrivateChat
                roomId={userID}
                username={`${userData.name} ${userData.lastName}`}
              />
            </>
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
};

export default ChatroomTechPage;
