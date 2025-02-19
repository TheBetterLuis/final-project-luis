import { Table, Button, Modal } from "flowbite-react";
import axios from "axios";
import { useState } from "react";

function EditUserModal({ data = null, openModal, setOpenModal }) {
  const [modalData, setModalData] = useState({});

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
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => setOpenModal(false)}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
export default EditUserModal;
