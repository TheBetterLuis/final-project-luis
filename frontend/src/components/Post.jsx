import { Card, Button, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import { useState } from "react";
import EditUserModal from "./EditUserModal";
import { Link } from "react-router-dom";
import Comments from "./Comments";

import { FaHeart, FaCommentDots } from "react-icons/fa";

import { formatDate } from "../../common/utils";

function Post({ data = null, userData = null }) {
  const [commentsData, setCommentsData] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [messageComments, setMessageComments] = useState("");

  const prepareComments = async () => {
    setIsVisible(true);
  };

  const handleCloseComments = async () => {
    setIsVisible(false);
    setMessageComments("");
  };

  const handleMessageComments = async (message) => {
    setMessageComments(message);
  };

  const handleDeletePost = async (postID) => {
    const isConfirmed = window.confirm("Eliminar post?");

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/posts/${postID}`
        );
      } catch (err) {
        setError(err.response?.data?.message || "Error al eliminar post");
      } finally {
        window.location.reload();
      }
    }
  };

  const handleHidePost = async (postID) => {
    let message = "";
    let newStatus = "";

    if (data.status === "private") {
      message = "Publicar Post?";
      newStatus = "public";
    }

    if (data.status === "public") {
      message = "Ocultar Post?";
      newStatus = "private";
    }

    const isConfirmed = window.confirm(message);

    if (isConfirmed) {
      try {
        const response = await axios.patch(`http://localhost:3001/api/posts/`, {
          id: postID,
          status: newStatus,
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Error al al cambiar visibilidad del post"
        );
      } finally {
        // window.location.reload();
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
        <>
          {/*    <div className="flex h-screen w-full  overflow-y-scroll ">*/}
          {/*            <div className="flex justify-center items-center h-screen w-full font-roboto overflow-y-scroll ">*/}
          <div className="rounded-lg mb-6">
            <Card className="max-w-sm md:w-96  bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
              <div className="flex gap-3">
                <img
                  className="rounded-full border border-azul5 w-20 h-20 dark:border-white"
                  src={data.userID.profilePicture}
                  alt={`foto de perfil de ${data.userID.name} ${data.userID.lastName}`}
                />
                <span className="text-sm text-gray-700 flex items-center justify-center drop-shadow-md dark:text-white capitalize">
                  {` ${data.userID.name} ${data.userID.lastName}`}
                </span>
              </div>
              <Card className="max-w-sm  bg-teal-500  bg-opacity-30 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-black drop-shadow-2xl shadow-2xl">
                <form className="flex max-w-md flex-col gap-4 ">
                  <div>
                    <div className="mb-2 block">
                      <Link to={`/ticket/${data.ticketID._id}`}>
                        <span className="text-black flex items-center justify-center drop-shadow-md dark:text-white">
                          {data.ticketID.title}
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs h-32 overflow-y-auto">
                    <p className="text-black dark:text-gray-400">
                      {data.ticketID.description}
                    </p>
                  </div>
                  <div className="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs w-20 text-center">
                    <p className="text-black dark:text-gray-400">
                      {formatDate(data.ticketID.createdAt)}
                    </p>
                  </div>
                  <img src={data.ticketID.image} alt=" " className="mb-4" />
                </form>
              </Card>
              <div className="flex justify-between">
                <FaHeart
                  size={26}
                  className="dark:text-white hover:text-red-500 dark:hover:text-red-500  cursor-pointer"
                />
                {userData.id === data.userID._id && (
                  <>
                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => {
                        handleDeletePost(data._id);
                      }}
                    >
                      <p className="text-xs">Eliminar Post</p>
                    </Button>
                    <Button
                      className="bg-gray-500 hover:bg-gray-600"
                      onClick={() => {
                        handleHidePost(data._id);
                      }}
                    >
                      <p className="text-xs">
                        {data.status === "private"
                          ? "Publicar Post"
                          : "Ocultar Post"}
                      </p>
                    </Button>
                  </>
                )}

                <FaCommentDots
                  size={26}
                  className="text-white hover:text-black dark:hover:text-gray-400 cursor-pointer"
                  onClick={() => prepareComments()}
                />
              </div>
            </Card>
          </div>
          {/*            </div>*/}
          {/*            </div>*/}
          <Comments
            data={data}
            visible={isVisible}
            userData={userData}
            handleCloseComments={handleCloseComments}
            messageComments={messageComments}
            handleMessageComments={handleMessageComments}
          />
        </>
      )}
    </>
  );
}

export default Post;
