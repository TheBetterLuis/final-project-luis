import { Table, Button, Modal } from "flowbite-react";
import axios from "axios";
import { useState } from "react";
import EditUserModal from "./EditUserModal";

function CRUD({ hidden = false, view = "users", data = null, fetchUsers }) {
  const [modalData, setModalData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async (userID, currentSection) => {
    // console.log(userID);
    const isConfirmed = window.confirm("Eliminar usuario?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/users/${userID}`
        );
        console.log(response.data);
      } catch (err) {
        console.error("Error al eliminar usuario", err);
      } finally {
        fetchUsers(currentSection);
      }
    }
  };

  const handleEdit = async (userID) => {
    /*
    console.log("something should happen");
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/users/${userID}`
      );
      console.log(response.data);
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
*/
  };

  const handleMakeAdmin = async (userID, currentSection) => {
    const isConfirmed = window.confirm("cambiar rol de usuario a admin?");
    if (isConfirmed) {
      try {
        const response = await axios.post(
          `http://localhost:3001/api/users/make/admin/${userID}`
        );
        console.log(response.data);
      } catch (err) {
        console.error("Error al cambiar rol de usuario", err);
      } finally {
        fetchUsers(currentSection);
      }
    }

    /*
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/users/${userID}`
      );
      console.log(response.data);
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
    */
  };

  const prepareModal = async (user) => {
    setModalData(user);
    setOpenModal(true);
    // const isConfirmed = window.confirm("cambiar rol de usuario a admin?");
    /*
    if (isConfirmed) {
      try {
        const response = await axios.post(
          `http://localhost:3001/api/users/make/admin/${userID}`
        );
        console.log(response.data);
      } catch (err) {
        console.error("Error al cambiar rol de usuario", err);
      } finally {
        fetchUsers(currentSection);
      }
    }
*/
  };

  return (
    <>
      {data === null && (
        <>
          <Button className="bg-gray-400 drop-shadow-md">
            <h1 className="text-2xl">No hay informacion disponible</h1>
          </Button>
        </>
      )}

      {data !== null && view === "users" && (
        <div className="w-full h-screen overflow-x-auto" hidden={hidden}>
          <Table className="drop-shadow-md">
            <Table.Head>
              <Table.HeadCell className="bg-white/30  dark:border-gray-700 dark:bg-gray-800/70 dark:text-white">
                Nombre
              </Table.HeadCell>
              <Table.HeadCell className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70 dark:text-white">
                Correo
              </Table.HeadCell>
              <Table.HeadCell className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70 dark:text-white">
                Opciones
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y bg-white/19">
              {data.map((user) => (
                <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200 capitalize">
                    {`${user.name} ${user.lastName}`}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    <Button.Group>
                      <Button
                        className="bg-azul2"
                        onClick={() => {
                          handleEdit(user._id);
                          prepareModal(user);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        className="bg-red-500"
                        onClick={() => {
                          handleDelete(user._id, "users");
                        }}
                      >
                        Eliminar
                      </Button>
                      <Button
                        className="bg-yellow-400"
                        onClick={() => {
                          handleMakeAdmin(user._id, "users");
                        }}
                      >
                        Dar admin
                      </Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <EditUserModal
            data={modalData}
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
        </div>
      )}

      {data !== null && view === "tech" && (
        <div className="w-full h-screen overflow-x-auto" hidden={hidden}>
          <Table className="drop-shadow-md">
            <Table.Head>
              <Table.HeadCell className="bg-white/30  dark:border-gray-700 dark:bg-gray-800/70 dark:text-white">
                Nombre
              </Table.HeadCell>
              <Table.HeadCell className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70 dark:text-white">
                Correo
              </Table.HeadCell>
              <Table.HeadCell className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70 dark:text-white">
                Opciones
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y bg-white/19">
              {data.map((user) => (
                <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200 capitalize">
                    {`${user.name} ${user.lastName}`}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    <Button.Group>
                      <Button
                        className="bg-azul2"
                        onClick={() => {
                          handleEdit(user._id);
                          prepareModal(user);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        className="bg-red-500"
                        onClick={() => {
                          handleDelete(user._id, "tech");
                        }}
                      >
                        Eliminar
                      </Button>
                      <Button
                        className="bg-yellow-400"
                        onClick={() => {
                          handleMakeAdmin(user._id, "tech");
                        }}
                      >
                        Dar admin
                      </Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <EditUserModal
            data={modalData}
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
        </div>
      )}
    </>
  );
}
export default CRUD;
