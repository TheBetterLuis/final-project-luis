import { Table, Button, Modal, TextInput, Label } from "flowbite-react";
import axios from "axios";
import { useState } from "react";

function EditUserModal({ data = null, openModal, setOpenModal }) {
  const [modalData, setModalData] = useState({});
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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

  return (
    <>
      {data === null && (
        <>
          <Modal
            show={openModal}
            size="md"
            onClose={() => setOpenModal(false)}
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
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header className="bg-blue-300" />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {data.name}
              </h3>
              <Label
                className="text-white drop-shadow-md"
                htmlFor="nombre2"
                value="NOMBRE"
              />

              <TextInput
                placeholder={data.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
export default EditUserModal;
