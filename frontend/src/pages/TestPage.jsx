import OtroSidebar from "../components/OtroSidebar";
import PageFooter from "../components/Footer";
import PrivateChat from "../components/Chatroom";
import { NavBar } from "../components/NavBar";

const ChatroomPage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1 ",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  return (
    <>
      <div className={`${styles.background}`}>
        <div className="relative z-40">
          <NavBar />
        </div>

        <div
          id="wrapper"
          className={`pt-24 pb-28 min-h-screen flex flex-col items-center justify-center wrapper`}
        >
          {/*Page Component goes here*/}
          <>
            <h1>jksdfkj</h1>
          </>

          {/*Page Component goes here*/}
        </div>
        <PageFooter />
      </div>
      <OtroSidebar
        buttons={[
          { name: "Inicio", link: "/feed" },
          { name: "Perfil", link: "/profile" },
        ]}
      />
    </>
  );
};

export default ChatroomPage;
