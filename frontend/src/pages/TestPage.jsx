import { Footer } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import CustomSidebar from "../components/CustomSidebar";

const TestPage = () => {
  function toggleSaibar() {
    document.querySelector(".saibar").classList.toggle("hidden");
  }
  return (
    <>
      <NavBar></NavBar>
      <div className="relative">
        <div>
          <h1 class="text-[#333] dark:text-[#dddcdc] hover:text-[#878787] dark:hover:text-[#fff]">
            Esto es un componente Prueba
          </h1>
          <CustomSidebar></CustomSidebar>
          <button
            onClick={() =>
              document
                .querySelector(".sidebar-toggle")
                .classList.toggle("hidden")
            }
            className="absolute text-red-400 z-40"
          >
            este button
          </button>
          <Footer container>
            <Footer.Copyright href="#" by="Flowbite™" year={2022} />
            <Footer.LinkGroup>
              <Footer.Link href="#">About</Footer.Link>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
              <Footer.Link href="#">Contact</Footer.Link>
            </Footer.LinkGroup>
          </Footer>
        </div>
      </div>
    </>
  );
};

export default TestPage;
