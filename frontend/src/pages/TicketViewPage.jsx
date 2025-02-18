import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Card, Button, Modal, TextInput } from "flowbite-react";
import { FaHeart, FaCommentDots } from "react-icons/fa";

import { formatDate } from "../../common/utils";

const TicketViewPage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  let returnPage = (
    <>
      <div className={`${styles.background}`}>
        <NavBar />
        <div className="flex h-screen w-full  overflow-y-scroll ">
          <div className="flex justify-center items-center h-screen w-full font-roboto overflow-y-scroll ">
            {/*COMPONENT GOES HERE*/}
            <div className="flex flex-col items-center">
              <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-md">
                Error al cargar ticket
              </span>
              <Link to={"/feed"}>
                <button
                  type="button"
                  className="group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 bg-azul2 text-gray-100 rounded w-36 h-12 drop-shadow-lg hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm">
                    Volver al Feed
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );

  const { ticketID } = useParams();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [postData, setPostData] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [newComment, setNewComment] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("tokenSesion");
      if (!token) {
        navigate("/login");
      }

      const decoded = jwtDecode(token);
      setUserData(decoded);

      const expiry = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (expiry < currentTime) {
        console.log("token has expired");
        localStorage.removeItem("tokenSesion");
        navigate("/login");
      }
    };

    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/posts/${ticketID}`
        );
        console.log("Post recibido:", response.data);
        setPostData(response.data[0]);
        setSuccess(true);
      } catch (err) {
        console.error("Error al cargar el ticket", err);
        setError(
          err.response?.data?.message ||
            "Ha ocurrido un error durante la carga del ticket"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
    fetchPost();
  }, [navigate, ticketID]);

  const handleDeletePost = async (postID) => {
    // console.log(commentID);
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

    if (postData.status === "private") {
      message = "Publicar Post?";
      newStatus = "public";
    }

    if (postData.status === "public") {
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
        window.location.reload();
      }
    }
  };

  const handleNewComment = async (content) => {
    const isConfirmed = window.confirm("Crear comentario?");

    if (isConfirmed) {
      try {
        const response = await axios.post(
          `http://localhost:3001/api/comments`,
          {
            postID: postData._id,
            userID: userData.id,
            content,
          }
        );
      } catch (err) {
        setError(err.response?.data?.message || "Error al crear comentario");
      } finally {
        setNewComment("");
      }
    }
  };

  if (
    success &&
    (postData.status === "public" ||
      userData.id === postData.userID._id ||
      userData.role === "admin" ||
      userData.role === "tech")
  ) {
    returnPage = (
      <>
        <div className={` flex flex-col min-h-screen ${styles.background}`}>
          <NavBar />

          <div className="flex h-screen w-full  overflow-y-scroll ">
            <div className="flex justify-center items-center h-screen w-full font-roboto overflow-y-scroll ">
              {/*COMPONENT GOES HERE*/}
              <div className="rounded-lg   mb-4 mt-20">
                <Card className="max-w-sm md:w-96  bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
                  <div className="flex gap-3">
                    <img
                      className="rounded-full border border-azul5 w-20 h-20 dark:border-white"
                      src={postData.userID.profilePicture}
                      alt={`foto de perfil de ${postData.userID.name} ${postData.userID.lastName}`}
                    />
                    <span className="text-sm text-gray-700 flex items-center justify-center drop-shadow-md dark:text-white capitalize">
                      {` ${postData.userID.name} ${postData.userID.lastName}`}
                    </span>
                  </div>
                  <Card className="max-w-sm  bg-teal-500  bg-opacity-30 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-black drop-shadow-2xl shadow-2xl">
                    <form className="flex max-w-md flex-col gap-4 ">
                      <div>
                        <div className="mb-2 block">
                          <Link to={`/ticket/${postData.ticketID._id}`}>
                            <span className="text-black flex items-center justify-center drop-shadow-md dark:text-white">
                              {postData.ticketID.title}
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs h-32 overflow-y-auto">
                        <p className="text-black dark:text-gray-400">
                          {postData.ticketID.description}
                        </p>
                      </div>
                      <div className="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs w-20 text-center">
                        <p className="text-black dark:text-gray-400">
                          {formatDate(postData.ticketID.createdAt)}
                        </p>
                      </div>
                      <img
                        src={postData.ticketID.image}
                        alt=" "
                        className="mb-4"
                      />
                    </form>
                  </Card>
                  <div className="flex justify-between">
                    <FaHeart
                      size={26}
                      className="dark:text-white hover:text-red-500 dark:hover:text-red-500  cursor-pointer"
                    />
                    {userData.id === postData.userID._id && (
                      <>
                        <Button
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => {
                            handleDeletePost(postData._id);
                          }}
                        >
                          <p className="text-xs">Eliminar Post</p>
                        </Button>
                        <Button
                          className="bg-gray-500 hover:bg-gray-600"
                          onClick={() => {
                            handleHidePost(postData._id);
                          }}
                        >
                          <p className="text-xs">
                            {postData.status === "private"
                              ? "Publicar Post"
                              : "Ocultar Post"}
                          </p>
                        </Button>
                      </>
                    )}

                    <FaCommentDots
                      size={26}
                      className="text-white hover:text-black dark:hover:text-gray-400 cursor-pointer"
                      onClick={() => setOpenModal(true)}
                    />
                  </div>
                </Card>
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
                        {`Comentarios`}
                      </h3>
                      <>
                        {postData.commentsID.map((comment, commentIndex) => (
                          <div className="text-start" hidden={comment.hidden}>
                            <h1 className="font-bold">{`${comment.userID.name} ${comment.userID.lastName}`}</h1>
                            <div className="flex justify-between mb-2">
                              <h2>{comment.content}</h2>
                              {(userData.id === comment.userID._id ||
                                userData.role === "admin") && (
                                <h2
                                  className="font-bold text-red-600 hover:text-gray-500 cursor-pointer"
                                  onClick={() => {
                                    // handleDeleteComment(
                                    //  comment._id,
                                    // commentIndex
                                    //);
                                  }}
                                >
                                  Eliminar
                                </h2>
                              )}
                            </div>
                          </div>
                        ))}
                      </>
                      <div className="flex justify-between mt-12 px-4">
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
              </div>
            </div>
          </div>
          <PageFooter />
        </div>
        <CustomSidebar
          name={userData.name}
          lastName={userData.lastName}
          image={userData.profilePicture}
        />
      </>
    );
  }

  return returnPage;
};

export default TicketViewPage;
