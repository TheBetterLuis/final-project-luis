import CRUD from "../components/CRUD";
import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";

const CrudPage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar />

        <div className="flex h-screen w-full  overflow-y-scroll mt-16 mb-24">
          <div className="flex flex-col w-full h-screen justify-evenly items-center">
            <div className="flex flex-row justify-center items-center space-x-4 sm:space-x-80">
              <button className="bg-azul4 text-white px-10 py-3 sm:px-20 sm:py-6 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg my-6">
                Usuarios
              </button>
              <button className="bg-azul4 text-white px-10 py-3 sm:px-20 sm:py-6 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg my-6">
                Tecnicos
              </button>
            </div>
            <CRUD />
          </div>
        </div>
        <PageFooter />
        <CustomSidebar />
      </div>
    </>
  );
};

export default CrudPage;
