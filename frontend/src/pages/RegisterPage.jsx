import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import Register from "../components/Register";

const RegisterPage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };
  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar />

        <div className="flex h-screen w-full  overflow-y-scroll">
          <div className="flex justify-center items-center h-screen w-full font-roboto overflow-y-scroll">
            {/*COMPONENT GOES HERE*/}
            <Register />
          </div>
        </div>
        <PageFooter />
      </div>
      <CustomSidebar></CustomSidebar>
    </>
  );
};

export default RegisterPage;
