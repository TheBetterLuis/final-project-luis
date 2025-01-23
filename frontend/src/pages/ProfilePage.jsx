import { Button } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import TicketView from "../components/TicketView";
import PageFooter from "../components/Footer";
import Tarjeta from "../components/Tarjeta";

const ProfilePage = () => {
  /*
    colors: {
      azul1: "#9CFFE5",
      azul2: "#6C9DFF",
      azul3: "#4491A1",
      azul4: "#074572",
      azul5: "#0B2545",
      azul6: "#00171F",
    }
    */
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar />
        <div className="grid place-items-center py-2 font-roboto mt-20 ">
          {/*COMPONENT GOES HERE*/}
          <Tarjeta className="relative" />
          <Button className=" md:block md:top-40 md:left-28 lg:left-32 xl:left-72  2xl:left-96 bg-azul4 absolute top-40 left-60 top-20 left-20 sm:left-40">
            Plan
          </Button>
          <Button className="md:block md:top-40 md:right-16 lg:right-32 xl:right-52 2xl:right-96 bg-azul4 absolute top-40 right-[300px] top-20 right-20 sm:right-40">
            Configuracion
          </Button>
          <TicketView />
          <TicketView />
        </div>
        <PageFooter />
      </div>
    </>
  );
};

export default ProfilePage;
