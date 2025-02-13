import { Button, Card, Label, TextInput } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ChangePasswordPage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1 ",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const [response, setResponse] = useState([]);
  const [code, setCode] = useState("");
  const [enterEmail, setEnterEmail] = useState(true);
  const [enterCode, setEnterCode] = useState(false);
  const [enterPassword, setEnterPassword] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logOut = async () => {
      const token = localStorage.getItem("tokenSesion");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const id = decoded.id;
          const request = await axios.post("http://localhost:3001/api/logout", {
            id: id,
          });
        } catch (e) {
          console.error("invalid token");
        }
      }
      localStorage.removeItem("tokenSesion");
    };

    logOut();
  }, [navigate]);

  const handleEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/forgotpassword",
        {
          email,
        }
      );

      setEnterEmail(false);
      setEnterCode(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante el proceso."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/unblockaccount",
        {
          email,
          resetCode: code,
        }
      );
      setEnterCode(false);
      setEnterPassword(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante el proceso."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        "http://localhost:3001/api/updatepassword",
        {
          email,
          password,
        }
      );
      setEnterPassword(false);
      setIsFinished(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante el proceso."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar />
        <div className="flex h-screen w-full  overflow-y-scroll ">
          <div className="flex justify-center items-center h-screen w-full font-roboto overflow-y-scroll ">
            {/*COMPONENT GOES HERE*/}
            <div className="py-2">
              <h1 className="drop-shadow-md text-center text-white text-xl pb-4">
                Cambio de clave
              </h1>
              <Card className="max-w-sm bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
                <form className="flex max-w-md flex-col gap-4 ">
                  {/* ENTER EMAIL*/}
                  {enterEmail && (
                    <>
                      <div>
                        <div className="mb-2 block">
                          <Label
                            className="text-white drop-shadow-md"
                            htmlFor="email2"
                            value="EMAIL"
                          />
                        </div>
                        <TextInput
                          id="email2"
                          type="email"
                          placeholder="name@flowbite.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <h2 className="drop-shadow-md text-center text-white text-lg py-2">
                          Ingresa tu correo electrónico para enviarte un código
                          de verificación. Este código nos permitirá confirmar
                          que eres tú y así poder proceder con el cambio de tu
                          clave. Recuerda clickear el botón de "Enviar Código".{" "}
                        </h2>
                        <h2 className="mt-2 text-center text-red-500 text-lg">
                          {error}
                        </h2>
                      </div>
                      <Button
                        className="bg-azul2 drop-shadow-md"
                        type="submit"
                        disabled={loading}
                        onClick={handleEmail}
                      >
                        {loading ? "Cargando..." : "Enviar Código"}
                      </Button>
                    </>
                  )}
                  {/* ENTER EMAIL*/}

                  {/* ENTER CODE*/}
                  {enterCode && (
                    <>
                      <div>
                        <Label
                          className="text-white drop-shadow-md"
                          htmlFor="password2"
                          value="Codigo de 6 digitos"
                        />
                        <TextInput
                          id="codigo"
                          type="text"
                          required
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                        <h2 className="drop-shadow-md text-center text-white text-lg py-2">
                          Ingresa el código de 6 dígitos que ha sido enviado a
                          tu correo electrónico. Este código nos ayudará a
                          verificar tu identidad para continuar con el proceso.{" "}
                        </h2>
                        <h2 className="mt-2 text-center text-red-500 text-lg">
                          {error}
                        </h2>
                      </div>
                      <Button
                        className="bg-azul2 drop-shadow-md "
                        type="submit"
                        disabled={loading}
                        onClick={handleCode}
                      >
                        {loading ? "Cargando..." : "Verificar Código"}
                      </Button>
                    </>
                  )}
                  {/* ENTER CODE*/}

                  {/*ENTER PASSWORD*/}
                  {enterPassword && (
                    <>
                      <div className="">
                        <div className="mb-2 block ">
                          <Label
                            className="text-white drop-shadow-md"
                            htmlFor="password2"
                            value="NUEVA CONTRASEÑA"
                          />
                        </div>
                        <TextInput
                          id="password2"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <h2 className="drop-shadow-md text-center text-white text-lg py-2">
                          Hemos verificado tu identidad. Ahora puedes ingresar
                          tu nueva contraseña y finalizar el proceso.{" "}
                        </h2>
                        <h2 className="mt-2 text-center text-red-500 text-lg">
                          {error}
                        </h2>
                      </div>
                      <Button
                        className="bg-azul2 drop-shadow-md "
                        type="submit"
                        disabled={loading}
                        onClick={handlePassword}
                      >
                        {loading ? "Cargando..." : "Cambiar Clave"}
                      </Button>
                    </>
                  )}
                  {/*ENTER PASSWORD*/}

                  {/*IS FINISHED*/}
                  {isFinished && (
                    <>
                      <div className="mb-2 block ">
                        <h2 className="drop-shadow-md text-center text-white text-lg py-2">
                          Hemos verificado tu identidad. Ahora puedes ingresar
                          tu nueva contraseña y finalizar el proceso.{" "}
                        </h2>
                      </div>
                      <Button
                        className="bg-azul2 drop-shadow-md "
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Iniciar sesion
                      </Button>
                    </>
                  )}
                  {/*IS FINISHED*/}
                </form>
              </Card>
            </div>

            {/*COMPONENT GOES HERE*/}
          </div>
        </div>
        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );
};

export default ChangePasswordPage;
