import { Button, Modal, TextInput, Select } from "flowbite-react";
import axios from "axios";
import { useState, useEffect } from "react";
import EditUserModal from "./EditUserModal";
import { Link } from "react-router-dom";
import { FaHeart, FaCommentDots } from "react-icons/fa";

import { formatDate } from "../../common/utils";

function StatusModal({
  data = null,
  userData = null,
  visible = false,
  handleCloseStatusModal,
  messageStatus,
  handleMessageStatus,
}) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data) {
      setStatus(data.status);
    }
  }, [data]);

  const handleEditStatus = async (e) => {
    e.preventDefault();

    const requestData = { id: data._id };

    if (status === "open" || status === "pending" || status === "closed") {
      requestData.status = status;
    }

    //console.log(requestData);

    try {
      const response = await axios.patch(
        "http://localhost:3001/api/tickets/",
        requestData
      );

      handleMessageStatus(response.data.message);
      // console.log(response.data.message);
    } catch (err) {
      console.error("Error al editar usuario", err);
    }
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      {data === null && userData === null && (
        <Modal
          show={visible}
          size="md"
          onClose={() => handleCloseStatusModal()}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {`Ticket Status`}
              </h3>

              <h1 className="text-gray-400 text-2xl">
                No hay informacion disponible
              </h1>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {data !== null && userData !== null && (
        <Modal
          show={visible}
          size="md"
          onClose={() => handleCloseStatusModal()}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {`Ticket Status`}
              </h3>

              <Select className="mb-4" value={status} onChange={handleChange}>
                <option value="open">ABIERTO</option>
                <option value="pending">REVISION</option>
                <option value="closed">RESUELTO</option>
              </Select>

              <h1 className="text-gray-400 text-xl text-center mt-6 pb-4">
                {typeof messageStatus === "string"
                  ? messageStatus
                  : JSON.stringify(messageStatus)}
              </h1>

              <Button
                className="bg-azul2 w-full"
                type="submit"
                onClick={handleEditStatus}
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
export default StatusModal;
