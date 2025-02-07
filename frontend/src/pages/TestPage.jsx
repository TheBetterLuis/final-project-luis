import { Footer } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import CustomSidebar from "../components/CustomSidebar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("tokenSesion");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      const userID = decoded.id;
      const userName = decoded.name;
      const userLastName = decoded.lastName;
      const userRole = decoded.role;
      const userPlan = decoded.plan;
      const expiry = decoded.exp;
      const currentTime = Date.now() / 1000;
      if (expiry < currentTime) {
        console.log("token has expired");
        localStorage.removeItem("tokenSesion");
      }

      return (
        <>
          <NavBar></NavBar>
          <div className="relative">
            <div>
              <h1 class="text-[#333] dark:text-[#dddcdc] hover:text-[#878787] dark:hover:text-[#fff]">
                {`ID:${userID},Name:${userName},Last Name:${userLastName},Role:${userRole},Plan:${userPlan}, token expiration:${expiry}`}
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
            <img
              src="../../public/ticketImages/67a59bab46e99e56abc7d650/67a59bab46e99e56abc7d650.jpg"
              alt="test"
            />
          </div>
        </>
      );
    } catch (error) {
      console.error("invalid token:", error);
      localStorage.removeItem("tokenSesion");
      return (
        <>
          <p>Invalid or expired token. Please login</p>
        </>
      );
    }
  } else {
    //window.location.href = "http://localhost:5173/#/login";
    return <p>Invalid or expired token. Please login</p>;
  }
  function toggleSaibar() {
    document.querySelector(".saibar").classList.toggle("hidden");
  }
};

export default TestPage;
