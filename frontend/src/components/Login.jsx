import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("tokenSesion");
      if (token) {
        const decoded = jwtDecode(token);
        const userRole = decoded.role;

        const expiry = decoded.exp;
        const currentTime = Date.now() / 1000;

        if (expiry < currentTime) {
          console.log("token has expired");
          localStorage.removeItem("tokenSesion");
          navigate("/login");
        }

        if (userRole === "admin") {
          navigate("/crud");
        }

        if (userRole === "tech") {
          navigate("/dashboard");
        }

        if (userRole === "premium") {
          navigate("/feed");
        }

        if (userRole === "free") {
          navigate("/feed");
        }
      }
    };

    fetchInfo();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });

      console.log("login successful:", response.data);
      localStorage.setItem("tokenSesion", JSON.stringify(response.data.token));

      const decoded = jwtDecode(response.data.token);
      const userRole = decoded.role;

      if (userRole === "admin") {
        navigate("/crud");
      }

      if (userRole === "tech") {
        navigate("/dashboard");
      }

      if (userRole === "premium") {
        navigate("/feed");
      }

      if (userRole === "free") {
        navigate("/feed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante el inicio de sesion."
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
      <div className="flex flex-col justify-center items-center">
        <h1 className="drop-shadow-md text-center text-white text-xl pb-4">
          Inicio de sesion
        </h1>
        <Card className=" max-w-4xl bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
          <form className="flex  flex-col gap-4 ">
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white drop-shadow-md"
                  htmlFor="email1"
                  value="CORREO"
                />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} //update email state
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white drop-shadow-md"
                  htmlFor="password1"
                  value="CONTRASEÑA"
                />
              </div>
              <TextInput
                id="password1"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} //update email state
              />
              <h2 className="mt-2 text-center text-red-500 text-sm">{error}</h2>
            </div>
            <Button
              className="bg-azul2 drop-shadow-md"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Cargando..." : "Iniciar sesion"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
