import { NavBar } from "../components/NavBar";
import TicketView from "../components/TicketView";
import PageFooter from "../components/Footer";

const FeedPage = () => {
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
        <div className="grid place-items-center py-2 font-roboto">
          {/*COMPONENT GOES HERE*/}
          <TicketView />
          <TicketView />
        </div>
        <PageFooter />
      </div>
    </>
  );
};

export default FeedPage;
