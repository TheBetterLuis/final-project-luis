import { NavBar } from "../components/NavBar";
import { Button } from "flowbite-react";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CreateInvoicePage = () => {
  const location = useLocation();
  const [response, setResponse] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1 ",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  useEffect(() => {
    const validateToken = async (token) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/token/validate",
          { token }
        );

        if (response.data.isValid) {
          setIsValid(true);
          fetchInfo(token);
          //          console.log(response.data.message);
        }
      } catch (error) {
        console.log("Error validando token", error);
        setError("Error validando token");
      }
    };

    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      validateToken(token);
    } else {
      console.log("no token,redireccion");
    }

    const fetchInfo = async (invoiceToken) => {
      const token = localStorage.getItem("tokenSesion");
      if (token) {
        const decoded = jwtDecode(token);
        const userRole = decoded.role;

        setUserData(decoded);

        const expiry = decoded.exp;
        const currentTime = Date.now() / 1000;

        if (expiry < currentTime) {
          console.log("token has expired");
          localStorage.removeItem("tokenSesion");
          navigate("/login");
        }

        if (userRole === "admin") {
          navigate("/crud");
        }

        if (userRole === "tech") {
          navigate("/dashboard");
        }

        if (userRole === "premium") {
          navigate("/feed");
        }

        if (userRole === "free") {
          handleInvoiceCreation(decoded, invoiceToken);
          //          navigate("/feed");
        }
      }
    };

    //fetchInfo();
  }, [location.search]);

  const handleInvoiceCreation = async (userInfo, invoiceToken) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/invoice/create",
        {
          userID: userInfo.id,
        }
      );

      setInvoiceData(response.data);
    } catch (err) {
      console.error("error en la creacion de factura", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la creacion de factura"
      );
    } finally {
      handleTokenDeletion(invoiceToken);
    }
  };
  const handleTokenDeletion = async (invoiceToken) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/token/remove",
        {
          token: invoiceToken,
        }
      );
      console.log(response.data.message);
    } catch (err) {
      console.log("error en la eliminacion de token", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la creacion de factura"
      );
    }
  };

  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar />
        <div
          id="wrapper"
          className="pt-24 pb-28 min-h-screen flex flex-col items-center justify-center"
        >
          {/*Page Component goes here*/}
          {invoiceData !== null && (
            <div>
              <h1>{invoiceData.message}</h1>
            </div>
          )}

          <Button
            onClick={() => {
              navigate("/logout");
            }}
          >
            Finalizar
          </Button>

          {/*Page Component goes here*/}
        </div>
        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );
};

export default CreateInvoicePage;
