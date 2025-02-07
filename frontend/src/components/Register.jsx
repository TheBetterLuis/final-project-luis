import { Button, Card, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3001/api/users", {
        name,
        lastName,
        email,
        password,
      });

      console.log("Usuario creado:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Error de registro:", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante el registro."
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
    <div className="py-2">
      <h1 className="drop-shadow-md text-center text-white text-xl pb-4">
        Registro
      </h1>
      <Card className="max-w-sm bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
        <form className="flex max-w-md flex-col gap-4 ">
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white drop-shadow-md"
                htmlFor="nombre2"
                value="NOMBRE"
              />
            </div>
            <TextInput
              id="nombre2"
              type="text"
              placeholder="nombre"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white drop-shadow-md"
                htmlFor="apellido2"
                value="APELLIDO"
              />
            </div>
            <TextInput
              id="apellido2"
              type="text"
              placeholder="apellido"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

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
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white drop-shadow-md"
                htmlFor="password2"
                value="CONTRASEÑA"
              />
            </div>
            <TextInput
              id="password2"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <h2 className="mt-2 text-center text-red-500 text-sm">{error}</h2>
          </div>
          <Button
            className="bg-azul2 drop-shadow-md"
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Cargando..." : "Registrarse"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
