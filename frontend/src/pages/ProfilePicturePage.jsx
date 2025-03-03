import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import { Button, Card, Label, FileInput } from "flowbite-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import OtroSidebar from "../components/OtroSidebar";

const ProfilePicturePage = () => {
  const styles = {
    background: "bg-gradient-to-r from-azul3  to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        //upload the image
        const imageResponse = await axios.post(
          `http://localhost:3001/api/images/profile/${userData.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("Imagen de perfil actualizada:", imageResponse.data);
        navigate("/logout");
      } else {
        console.log("No se envio alguna imagen");
      }
    } catch (err) {
      console.error("error al actualizar imagen de perfil", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la actualizacion de imagen de perfil"
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
          <div className="py-2">
            <h1 className="drop-shadow-md text-center text-white text-xl pb-4">
              Imagen De Perfil
            </h1>
            <Card className="max-w-sm bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
              <form className="flex max-w-md flex-col gap-4 ">
                <img src={userData.profilePicture} alt=" " className="mb-4" />
                <div>
                  <div className="mb-2 block">
                    <Label
                      className="text-white drop-shadow-md"
                      htmlFor="adjuntar3"
                      value="ADJUNTAR IMAGEN"
                    />
                  </div>

                  <FileInput
                    id="adjuntar3"
                    sizing="sm"
                    className="mb-4"
                    onChange={handleFileChange}
                  />
                  <h2 className="mt-2 text-center text-red-500 text-sm">
                    {error}
                  </h2>
                </div>
                <Button
                  className="bg-azul2 drop-shadow-md"
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  <p>Cambiar Imagen De Perfil</p>
                </Button>
              </form>
            </Card>
          </div>
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

export default ProfilePicturePage;
