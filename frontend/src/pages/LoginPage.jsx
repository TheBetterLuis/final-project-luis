import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import Login from "../components/Login";
import { isSomeoneLogged } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1 ",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  useEffect(() => {
    if (isSomeoneLogged() & true) {
      navigate("/feed");
    }
  }, []);

  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar />
        <div className="flex h-screen w-full  overflow-y-scroll ">
          <div className="flex justify-center items-center h-screen w-full font-roboto overflow-y-scroll ">
            {/*COMPONENT GOES HERE*/}
            <Login />

            {/*COMPONENT GOES HERE*/}
          </div>
        </div>

        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );
};

export default LoginPage;
