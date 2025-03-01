import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import Boton from "../components/Button";
import CustomSidebar from "../components/CustomSidebar";
import { useNavigate, Link } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1 ",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
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
          <Link to={`/login`}>
            <Boton message={`Volver al inicio`} />
          </Link>
          {/*Page Component goes here*/}
        </div>
        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );
};

export default NotFoundPage;
