import { Table, Button } from "flowbite-react";
import axios from "axios";

function CRUD({ hidden = false, view = "users", data = null, fetchUsers }) {
  const handleDelete = async (userID, currentSection) => {
    console.log(userID);
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
    console.log("something should happen");
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

  const handleMakeAdmin = async (userID) => {
    console.log("something should happen");
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
                          handleMakeAdmin(user._id);
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
                          handleMakeAdmin(user._id);
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
        </div>
      )}
    </>
  );
}
export default CRUD;
