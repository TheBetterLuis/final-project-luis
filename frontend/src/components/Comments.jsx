import { Card, Button, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import { useState } from "react";
import EditUserModal from "./EditUserModal";
import { Link } from "react-router-dom";
import { FaHeart, FaCommentDots } from "react-icons/fa";

import { formatDate } from "../../common/utils";

function Comments({
  data = null,
  userData = null,
  visible = false,
  messageComments,
  handleCloseComments,
  handleMessageComments,
}) {
  const [testModal, setTestModal] = useState(true);
  const [newComment, setNewComment] = useState("");

  const handleNewComment = async (content) => {
    const isConfirmed = window.confirm("Crear comentario?");

    if (isConfirmed) {
      try {
        const response = await axios.post(
          `http://localhost:3001/api/comments`,
          {
            postID: data._id,
            userID: userData.id,
            content,
          }
        );

        handleMessageComments(response.data.message);
      } catch (err) {
        setError(err.response?.data?.message || "Error al crear comentario");
      } finally {
        setNewComment("");
        // window.location.reload();
      }
    }
  };

  const handleDeleteComment = async (commentID, commentIndex) => {
    const isConfirmed = window.confirm("Eliminar comentario?");

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/comments/delete/${commentID}`
        );

        handleMessageComments(response.data.message);
      } catch (err) {
        handleMessageComments(
          err.response?.data?.message || "Error al eliminar comentario"
        );
      } finally {
        //        window.location.reload();
      }
    }
  };

  return (
    <>
      {data === null && userData === null && (
        <>
          <Button className="bg-gray-400 drop-shadow-md">
            <h1 className="text-2xl">No hay informacion disponible</h1>
          </Button>
        </>
      )}

      {data !== null && userData !== null && (
        <Modal
          show={visible}
          size="md"
          onClose={() => handleCloseComments()}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {`Comentarios`}
              </h3>
              <>
                {data.commentsID.map((comment, commentIndex) => (
                  <div className="text-start" hidden={comment.hidden}>
                    <h1 className="font-bold">{`${comment.userID.name} ${comment.userID.lastName}`}</h1>
                    <div className="flex justify-between mb-2">
                      <h2>{comment.content}</h2>
                      {(userData.id === comment.userID._id ||
                        userData.role === "admin") && (
                        <h2
                          className="font-bold text-red-600 hover:text-gray-500 cursor-pointer"
                          onClick={() => {
                            handleDeleteComment(comment._id, commentIndex);
                          }}
                        >
                          Eliminar
                        </h2>
                      )}
                    </div>
                  </div>
                ))}
              </>
              <h1 className="text-gray-400 text-xl text-center mt-6 pb-4">
                {typeof messageComments === "string"
                  ? messageComments
                  : JSON.stringify(messageComments)}
              </h1>

              <div className="flex justify-between  px-4">
                <TextInput
                  placeholder="Escribe aqui"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                  onClick={() => {
                    handleNewComment(newComment);
                  }}
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
export default Comments;
