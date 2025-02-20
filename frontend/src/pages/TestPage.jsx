import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import Post from "../components/Post";
import CustomSidebar from "../components/CustomSidebar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";

const TestPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState([]);

  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

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

  const fetchPosts = async (page = 1) => {
    try {
      const response = await axios.post(
        //67b413709dc0223f4e00024f
        //67b4035e9dc0223f4e00004a
        `http://localhost:3001/api/posts/paginate?page=${page}`
      );
      console.log("Post recibido:", response.data);
      setPostsData((prevPosts) => [...prevPosts, ...response.data.posts]);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Error al cargar el ticket", err);
    }
  };

  useEffect(() => {
    fetchInfo();
    fetchPosts(1);
  }, [navigate]);

  const loadNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchPosts(currentPage + 1);
    console.log("loaded more");
  };

  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar></NavBar>
        <div
          id="wrapper"
          className="pt-24 pb-28 min-h-screen flex flex-col items-center justify-center"
        >
          {/*Page Component goes here*/}

          {postsData !== null && userData !== null && (
            <>
              {postsData.map((postData) => (
                <>
                  <Post data={postData} userData={userData} />
                </>
              ))}
            </>
          )}
          {currentPage < totalPages ? (
            <Button className="bg-azul2 drop-shadow-md " onClick={loadNextPage}>
              Cargar mas posts
            </Button>
          ) : (
            <Button className="bg-gray-400 drop-shadow-md">
              No hay mas posts disponibles
            </Button>
          )}

          {/*Page Component goes here*/}
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
};

export default TestPage;
