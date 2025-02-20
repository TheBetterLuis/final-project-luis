import { Card, Button, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import { useState } from "react";
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
}) {
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
                {`Comentarios`}
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
                {`Comentarios`}
              </h3>

              <h1 className="text-gray-400 text-xl text-center mt-6 pb-4">
                {typeof messageStatus === "string"
                  ? messageStatus
                  : JSON.stringify(messageStatus)}
              </h1>

              <div className="flex justify-between  px-4">
                <TextInput placeholder="Escribe aqui" />
                <Button
                  onClick={() => handleCloseStatusModal()}
                  className="bg-azul2 drop-shadow-md"
                >
                  Comentar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
export default StatusModal;
