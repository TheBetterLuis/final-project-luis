import React, { useState, useEffect } from "react";
import { Checkbox } from "flowbite-react";
import { Table } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [openTickets, setOpenTickets] = useState();
  const [pendingTickets, setPendingTickets] = useState();
  const [closedTickets, setClosedTickets] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("tokenSesion");

      if (!token) {
        navigate("/login");
      }

      if (token) {
        try {
          const decoded = jwtDecode(token);
          //  console.log(decoded);
          setUserData(decoded);
          const techID = decoded.id;
          const userRole = decoded.role;
          const expiry = decoded.exp;
          const currentTime = Date.now() / 1000;
          if (expiry < currentTime) {
            console.log("token has expired");
            localStorage.removeItem("tokenSesion");
            navigate("/login");
          }

          if (userRole !== "admin" && userRole !== "tech") {
            navigate("/login");
          }

          const openResponse = await axios.post(
            "http://localhost:3001/api/tickets/tech/open",
            {
              techID: techID,
            }
          );
          setOpenTickets(openResponse.data);

          const pendingResponse = await axios.post(
            "http://localhost:3001/api/tickets/tech/pending",
            {
              techID: techID,
            }
          );
          setPendingTickets(pendingResponse.data);

          const closedResponse = await axios.post(
            "http://localhost:3001/api/tickets/tech/closed",
            {
              techID: techID,
            }
          );
          setClosedTickets(closedResponse.data);

          setLoading(false);
        } catch (e) {
          console.error("invalid token");
          setError("Error fetching tickets.");
          setLoading(false);
        }
      }
    };

    fetchTickets();
  }, [navigate]);

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar />
        <div className="flex h-screen w-full bg-gradient-to-tr from-azul4 via-azul3 to-azul1 overflow-y-scroll">
          <div className="hidden sm:block sm:w-1/6 sm:h-full"></div>
          <div className="flex flex-col  sm:flex-row items-center justify-around w-full h-full max-sm:mt-60 mb-24">
            <div className="flex flex-col items-center justify-around">
              <button className="bg-azul4 text-white px-10 py-3 sm:px-16 sm:py-5 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg text-center my-3">
                Tickets <br />
                abiertos
              </button>
              <br />
              <Table className="drop-shadow-2xl ">
                <Table.Body className="divide-y bg-white/19">
                  {openTickets.length === 0 ? (
                    <h1 className="text-black text-lg">
                      No tienes tickets abiertos
                    </h1>
                  ) : (
                    openTickets.map((ticket) => (
                      <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                          <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                          <Link to={`/ticket/${ticket._id}`}>
                            {ticket.title}
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>
            </div>
            <br />
            <div className="flex flex-col items-center justify-around">
              <button className="bg-azul4 text-white px-10 py-3 sm:px-16 sm:py-5 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg text-center my-3">
                Tickets <br /> en revisión
              </button>
              <br />
              <Table className="drop-shadow-2xl ">
                <Table.Body className="divide-y bg-white/19">
                  {pendingTickets.length === 0 ? (
                    <h1 className="text-black text-lg">
                      No tienes tickets en revision
                    </h1>
                  ) : (
                    pendingTickets.map((ticket) => (
                      <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                          <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                          <Link>{ticket.title}</Link>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>
            </div>
            <br />
            <div className="flex flex-col items-center justify-around">
              <button className="bg-azul4 text-white px-10 py-3 sm:px-16 sm:py-5 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg text-center my-3">
                Tickets <br /> resueltos
              </button>
              <br />
              <Table className="drop-shadow-2xl ">
                <Table.Body className="divide-y bg-white/19">
                  {closedTickets.length === 0 ? (
                    <h1 className="text-black text-lg">
                      No tienes tickets resueltos
                    </h1>
                  ) : (
                    closedTickets.map((ticket) => (
                      <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                          <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                          <Link>{ticket.title}</Link>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
        <PageFooter />
        <CustomSidebar
          name={userData.name}
          lastName={userData.lastName}
          image={userData.profilePicture}
        />
      </div>
    </>
  );
};

export default Dashboard;
