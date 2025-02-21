import { Table, Button, Modal, TextInput, Label, Select } from "flowbite-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditUserModal({
  data = null,
  openModal,
  handleCloseModal,
  handleMessage,
  message,
  showRoleSelection = null,
  logout = null,
}) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setLastName(data.lastName);
      setEmail(data.email);
      setRole(data.role);
    }
  }, [data]);

  const handleEdit = async (e) => {
    e.preventDefault();

    // const requestData = { id: data._id };

    const requestData = {};

    if (data.id) {
      requestData.id = data.id;
    } else if (data._id) {
      requestData.id = data._id;
    }

    if (name !== "") {
      requestData.name = name;
    }

    if (lastName !== "") {
      requestData.lastName = lastName;
    }

    if (email !== "") {
      requestData.email = email;
    }

    if (password !== "") {
      requestData.password = password;
    }

    if (role !== "") {
      requestData.role = role;
    }

    //console.log(requestData);

    try {
      const response = await axios.patch(
        "http://localhost:3001/api/users",
        requestData
      );

      handleMessage(response.data.message);
      // console.log(response.data.message);
    } catch (err) {
      console.error("Error al editar usuario", err);
    } finally {
      if (logout) {
        navigate("/logout");
      }
    }
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <>
      {data === null && (
        <>
          <Modal
            show={openModal}
            size="md"
            onClose={() => handleCloseModal()}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  No hay informacion disponible
                </h3>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}

      {data !== null && (
        <Modal
          show={openModal}
          size="md"
          onClose={() => handleCloseModal()}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <h1 className="text-gray-400 text-center text-xl pb-2 uppercase">
              Editar Usuario
            </h1>
            <div className="text-start">
              <Label
                className="text-black text-md drop-shadow-md"
                value="NOMBRE"
              />
              <TextInput
                placeholder={name}
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="mb-4"
              />

              <Label
                className="text-black text-md drop-shadow-md"
                value="APELLIDO"
              />
              <TextInput
                placeholder={lastName}
                value={lastName}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                className="mb-4"
              />

              <Label
                className="text-black text-md drop-shadow-md"
                value="EMAIL"
              />
              <TextInput
                placeholder={email}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />

              <Label
                className="text-black text-md drop-shadow-md"
                value="CONTRASEÑA"
              />
              <TextInput
                placeholder={``}
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
              />
              {showRoleSelection && (
                <>
                  <Label
                    className="text-black text-md drop-shadow-md"
                    value="ROL"
                  />
                  <Select className="mb-4" value={role} onChange={handleChange}>
                    <option value="free">FREE</option>
                    <option value="premium">PREMIUM</option>
                    <option value="tech">TECH</option>
                    <option value="admin">ADMIN</option>
                  </Select>
                </>
              )}

              <h1 className="text-gray-400 text-xl text-center pb-2">
                {typeof message === "string"
                  ? message
                  : JSON.stringify(message)}
              </h1>
              <Button
                className="bg-azul2 w-full"
                type="submit"
                onClick={handleEdit}
              >
                Guardar Informacion
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
export default EditUserModal;
