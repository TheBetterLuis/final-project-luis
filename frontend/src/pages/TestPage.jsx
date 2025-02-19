import { Footer } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import Post from "../components/Post";
import Comments from "../components/Comments";
import CustomSidebar from "../components/CustomSidebar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const TestPage = () => {
  //const array = [0, 1, 2];
  //const [openModal, setOpenModal] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  /*
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
  */

  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const [postData, setPostData] = useState({});

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
    try {
      const response = await axios.get(
        //67b413709dc0223f4e00024f
        //67b4035e9dc0223f4e00004a
        `http://localhost:3001/api/posts/67b4137c9dc0223f4e000257`
      );
      console.log("Post recibido:", response.data);
      setPostData(response.data[0]);
    } catch (err) {
      console.error("Error al cargar el ticket", err);
    }
  };

  useEffect(() => {
    fetchInfo();
    fetchPost();
  }, []);

  const handleCloseComments = async () => {
    setIsVisible(false);
  };

  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar></NavBar>
        {/*      <div className="bg-black">
        {array.map((index) => (
          <>
            <Button onClick={() => handleOpenModal(index)}>Toggle modal</Button>
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
                    {`modal ${index}`}
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

          </>
        ))}
      </div>
*/}
        {/*       <Post data={null} userData={null} />*/}
        <Post data={postData} userData={userData} />
        {/*
        <Button
          onClick={() => {
            setIsVisible(true);
          }}
        >
          abrir
        </Button>
*/}
        {/*          <Comments
          data={postData}
          visible={isVisible}
          userData={userData}
          handleCloseComments={handleCloseComments}
        />
*/}
      </div>
    </>
  );
};

export default TestPage;
