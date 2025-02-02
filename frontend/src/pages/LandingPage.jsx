import Boton from "../components/Button";
import NavBar from "../components/NavBar";
import PageFooter from "../components/Footer";
import { Link } from "react-router-dom";

const Landingpage = () => {
  const styles = {
    cuerpo:
      "h-screen w-screen sm:w-full sm:h-screen bg-gradient-to-b from-azul4 via-azul3 to-azul1 flex flex-row items-center justify-center text-gray-100",
    caja: "flex flex-col sm:flex-row items-center justify-around  text-gray-100 sm:px-24 sm:py-10",
    imagen: "w-3/4 drop-shadow-2xl",
    caja2: "grid place-items-center px-10",
    h1: "text-xl sm:text-6xl font-bold text-white drop-shadow-2xl",
  };

  return (
    <>
      <div className={`bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1`}>
        <NavBar />
        <div className="flex h-screen w-full  overflow-y-scroll ">
          <div className="flex justify-center items-center h-screen w-full font-roboto overflow-y-scroll ">
            <section className={styles.cuerpo}>
              <div className={styles.caja}>
                <img
                  className={styles.imagen}
                  src="../../public/img/señora_compu-removebg-preview.png"
                  alt=""
                />
                <div className={styles.caja2}>
                  <h1 className={styles.h1}>
                    Cobertura total para un mundo conectado.
                  </h1>
                  <br />
                  <br />
                  <Link to="/login">
                    <Boton message={"Comienza Ya!"} />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
        <PageFooter />
      </div>
    </>
  );
};

export default Landingpage;
