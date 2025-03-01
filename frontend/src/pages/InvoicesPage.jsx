import { Button } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import Invoice from "../components/Invoice";

const InvoicesPage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const [userData, setUserData] = useState(null);
  const [viewedUserData, setViewedUserData] = useState(null);
  const [invoicesData, setInvoicesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { userID } = useParams();

  const fetchInvoices = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/invoice/paginate/user/${userID}?page=${page}`
      );
      setInvoicesData((prevPosts) => [...prevPosts, ...response.data.invoices]);
      setTotalPages(response.data.totalPages);
      setViewedUserData({
        ...response.data.user,
        postCount: response.data.userPostCount,
        totalLikes: response.data.userTotalLikes,
      });

      setSuccess(true);
    } catch (err) {
      console.error("Error al cargar facturas", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la carga de facturas"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("tokenSesion");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserData(decoded);

          const userRole = decoded.role;

          const expiry = decoded.exp;
          const currentTime = Date.now() / 1000;
          if (expiry < currentTime) {
            console.log("token has expired");
            localStorage.removeItem("tokenSesion");
            navigate("/login");
          }

          if (userRole === "premium") {
            navigate("/feed");
          }

          if (userRole === "free") {
            navigate("/feed");
          }
        } catch (e) {
          console.error("invalid token", e.message);
        }
      } else {
        navigate("/login");
      }
    };

    fetchInfo();
  }, [navigate]);

  useEffect(() => {
    if (userData && userData.id) {
      fetchInvoices(1);
    }
  }, [userData]);

  const loadNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchInvoices(currentPage + 1);
    console.log("loaded more");
  };

  let pageContent = (
    <>
      {invoicesData === null && (
        <>
          <Button className="bg-gray-400 drop-shadow-md">
            <h1 className="text-2xl">No hay informacion disponible</h1>
          </Button>
        </>
      )}
    </>
  );

  if (success) {
    pageContent = (
      <>
        {invoicesData !== null && userData !== null && (
          <>
            {invoicesData.map((factura, index) => (
              <Invoice data={factura} noButtons={true} />
            ))}
          </>
        )}
        {currentPage < totalPages ? (
          <Button
            className="bg-azul2 drop-shadow-md mt-4"
            onClick={loadNextPage}
          >
            Cargar mas facturas
          </Button>
        ) : (
          <Button className="bg-gray-400 drop-shadow-md mt-4">
            No hay facturas disponibles
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      <div className={`${styles.background_feed}`}>
        <div
          id="wrapper"
          className="pt-24 pb-28 min-h-screen flex flex-col items-center justify-center"
        >
          <div className="relative z-40">
            <NavBar />
          </div>
          <div
            className={`${styles.background} fixed top-0 left-0 w-screen h-1/4 z-1 `}
          ></div>
          <div className="grid place-items-center py-2 font-roboto mt-20">
            {/*COMPONENT GOES HERE*/}
            {pageContent}
          </div>
        </div>
        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );
};

export default InvoicesPage;
