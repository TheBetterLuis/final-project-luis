import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Card, Button, Modal } from "flowbite-react";
import { FaHeart, FaCommentDots } from "react-icons/fa";

import { formatDate } from "../../common/utils";

import { HiOutlineExclamationCircle } from "react-icons/hi";

const FeedPage = () => {
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
              <span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-md">
                Error al cargar posts
              </span>
              <Link to={"/feed"}>
                <button
                  type="button"
                  class="group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none border border-transparent focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700 bg-azul2 text-gray-100 rounded w-36 h-12 drop-shadow-lg hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  <span class="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm">
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

  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [openModal, setOpenModal] = useState([]);
  const [statusLike, setStatusLike] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/posts/paginate?page=${page}`
      );
      setPostsData((prevPosts) => [...prevPosts, ...response.data.posts]);
      setTotalPages(response.data.totalPages);

      setSuccess(true);
    } catch (err) {
      console.error("Error al cargar posts", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la carga de posts"
      );
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (userID, postID) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/posts/${postID}/like`,
        {
          userID,
        }
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error al dar like al  post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("tokenSesion");
      if (!token) {
        navigate("/login");
      }

      const decoded = jwtDecode(token);
      setUserData(decoded);
      const techID = decoded.id;
      const userName = decoded.name;
      const userLastName = decoded.lastName;
      const userRole = decoded.role;

      const expiry = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (expiry < currentTime) {
        console.log("token has expired");
        localStorage.removeItem("tokenSesion");
        navigate("/login");
      }
    };

    fetchInfo();
    fetchPosts(1);
  }, [navigate]);

  const loadNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchPosts(currentPage + 1);
    console.log("loaded more");
  };

  const toggleLike = (index) => {
    setStatusLike((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleOpenModal = (index) => {
    setOpenModal((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handleCloseModal = (index) => {
    setOpenModal((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  if (success) {
    returnPage = (
      <>
        <div className={` flex flex-col min-h-screen ${styles.background}`}>
          <NavBar />
          <div className="grid place-items-center py-2 font-roboto">
            {/*COMPONENT GOES HERE*/}
            {postsData.map((postData, index) => (
              <div className="rounded-lg mb-4">
                <Card className="max-w-sm md:w-96 bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
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
                  <Card className="max-w-sm bg-teal-500  bg-opacity-30 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-black drop-shadow-2xl shadow-2xl">
                    <form className="flex max-w-md flex-col gap-4 ">
                      <div>
                        <div className="mb-2 block">
                          <span className="text-black flex items-center justify-center drop-shadow-md dark:text-white">
                            {postData.ticketID.title}
                          </span>
                        </div>
                      </div>
                      <div class="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs h-32 overflow-y-auto">
                        <p class="text-black dark:text-gray-400">
                          {postData.ticketID.description}
                        </p>
                      </div>
                      <div class="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs w-20 text-center">
                        <p class="text-black dark:text-gray-400">
                          {formatDate(postData.ticketID.createdAt)}
                        </p>
                      </div>
                      {postData.ticketID.image && (
                        <div className="flex justify-center">
                          <img
                            src={postData.ticketID.image}
                            className="mb-4 w-auto"
                          />
                        </div>
                      )}
                    </form>
                  </Card>
                  <div className="flex justify-between">
                    <FaHeart
                      post-id={index}
                      size={26}
                      className={` 

${
  statusLike[index]
    ? "text-red-500 hover:text-black dark:text-red-500 dark:hover:text-white liked"
    : "text-black hover:text-red-500 dark:text-white dark:hover:text-red-500 not-liked"
}  cursor-pointer`}
                      onClick={() => {
                        toggleLike(index);
                        likePost(userData.id, postData._id);
                      }}
                    />
                    <FaCommentDots
                      size={26}
                      className="text-white hover:text-black dark:hover:text-gray-400 cursor-pointer"
                      onClick={() => handleOpenModal(index)}
                    />
                  </div>
                </Card>
                {/*MODAL*/}
                <Modal
                  show={openModal[index]}
                  size="md"
                  onClose={() => handleCloseModal(index)}
                  popup
                >
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {`modal ${index + 1}`}
                      </h3>
                      <div className="flex justify-center gap-4">
                        <Button
                          color="failure"
                          onClick={() => handleCloseModal(index)}
                        >
                          {"Yes, I'm sure"}
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => handleCloseModal(index)}
                        >
                          No, cancel
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            ))}
            {currentPage < totalPages ? (
              <Button
                className="bg-azul2 drop-shadow-md "
                onClick={loadNextPage}
              >
                Cargar mas posts
              </Button>
            ) : (
              <Button className="bg-gray-400 drop-shadow-md">
                No hay mas posts disponibles
              </Button>
            )}
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

export default FeedPage;
