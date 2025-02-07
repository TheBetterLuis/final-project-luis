import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import Ticket from "../components/Ticket";
import {
  Button,
  Card,
  Label,
  Textarea,
  TextInput,
  FileInput,
  Datepicker,
} from "flowbite-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const CreateTicketPage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
      const response = await axios.post("http://localhost:3001/api/tickets", {
        userID: userData.id,
        title,
        description,
      });

      console.log("Ticket creado:", response.data);

      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        //upload the image
        const imageResponse = await axios.post(
          `http://localhost:3001/api/tickets/${response.data._id}/image`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("Imagen subida:", imageResponse.data);
      } else {
        console.log("No se envio alguna imagen");
      }

      navigate("/feed");
    } catch (err) {
      console.error("Error de al crear el ticket o subir la imagen", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la creacion del ticket"
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
        <NavBar />
        <div className="flex justify-center items-center h-screen w-full font-roboto">
          <div className="flex justify-center items-center h-screen w-full font-roboto overflow-y-scroll ">
            {/*COMPONENT GOES HERE*/}
            <div className="py-2">
              <h1 className="drop-shadow-md text-center text-white text-xl pb-4">
                Ticket
              </h1>
              <Card className="max-w-sm bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
                <form className="flex max-w-md flex-col gap-4 ">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="text-white drop-shadow-md"
                        htmlFor="titulo3"
                        value="TITULO"
                      />
                    </div>
                    <TextInput
                      id="titulo3"
                      type="text"
                      placeholder="titulo"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="text-white drop-shadow-md"
                        htmlFor="descripcion3"
                        value="DESCRIPCION"
                      />
                    </div>
                    <Textarea
                      className="text-xs"
                      id="descripcion3"
                      placeholder="describe de que se trata este ticket"
                      required
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="text-white drop-shadow-md"
                        htmlFor="fecha3"
                        value="FECHA"
                      />

                      <Datepicker
                        id="fecha3"
                        minDate={new Date()}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="text-white drop-shadow-md"
                        htmlFor="adjuntar3"
                        value="ADJUNTAR ARCHIVO"
                      />
                    </div>

                    <FileInput
                      id="adjuntar3"
                      sizing="sm"
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
                    <p>Guardar Ticket</p>
                  </Button>
                </form>
              </Card>
            </div>
            {/*COMPONENT GOES HERE*/}
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

export default CreateTicketPage;
