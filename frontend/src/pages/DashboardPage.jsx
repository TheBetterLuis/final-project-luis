import { useState, useEffect } from "react";
import { Table, Button } from "flowbite-react";
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
  const [openTickets, setOpenTickets] = useState([]);
  const [pendingTickets, setPendingTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);

  const [currentPageOpen, setCurrentPageOpen] = useState(1);
  const [totalPagesOpen, setTotalPagesOpen] = useState(0);

  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [totalPagesPending, setTotalPagesPending] = useState(0);

  const [currentPageClosed, setCurrentPageClosed] = useState(1);
  const [totalPagesClosed, setTotalPagesClosed] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOpenTickets = async (page = 1) => {
    console.log("fetchOpentickets Called");
    try {
      const openResponse = await axios.post(
        `http://localhost:3001/api/tickets/tech/open/paginate?page=${page}`,
        {
          techID: userData.id,
        }
      );
      setOpenTickets((prevTickets) => [
        ...prevTickets,
        ...openResponse.data.tickets,
      ]);
      setTotalPagesOpen(openResponse.data.totalPages);
    } catch (err) {
      console.error("Error al cargar tickets abiertos", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la carga de tickets abiertos"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingTickets = async (page = 1) => {
    console.log("fetchPendingtickets Called");
    try {
      const pendingResponse = await axios.post(
        `http://localhost:3001/api/tickets/tech/pending/paginate?page=${page}`,
        {
          techID: userData.id,
        }
      );
      setPendingTickets((prevTickets) => [
        ...prevTickets,
        ...pendingResponse.data.tickets,
      ]);
      setTotalPagesPending(pendingResponse.data.totalPages);
    } catch (err) {
      console.error("Error al cargar tickets en revision", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la carga de tickets en revision"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchClosedTickets = async (page = 1) => {
    console.log("fetchClosedtickets Called");
    try {
      const closedResponse = await axios.post(
        `http://localhost:3001/api/tickets/tech/closed/paginate?page=${page}`,
        {
          techID: userData.id,
        }
      );
      setClosedTickets((prevTickets) => [
        ...prevTickets,
        ...closedResponse.data.tickets,
      ]);
      setTotalPagesClosed(closedResponse.data.totalPages);
    } catch (err) {
      console.error("Error al cargar tickets en resueltos", err);
      setError(
        err.response?.data?.message ||
          "Ha ocurrido un error durante la carga de tickets resueltos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("tokenSesion");

      if (!token) {
        navigate("/login");
      }

      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserData(decoded);
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

          setLoading(false);
        } catch (e) {
          console.error("invalid token", e.message);
          setError("Error fetching tickets.");
          setLoading(false);
        }
      }
    };

    fetchInfo();
  }, [navigate]);

  useEffect(() => {
    if (userData && userData.id) {
      fetchOpenTickets(1);
      fetchPendingTickets(1);
      fetchClosedTickets(1);
    }
  }, [userData]);

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const loadNextOpenPage = () => {
    setCurrentPageOpen((prevPage) => prevPage + 1);
    fetchOpenTickets(currentPageOpen + 1);
    console.log("loaded more");
  };

  const loadNextPendingPage = () => {
    setCurrentPagePending((prevPage) => prevPage + 1);
    fetchPendingTickets(currentPagePending + 1);
    console.log("loaded more");
  };

  const loadNextClosedPage = () => {
    setCurrentPageClosed((prevPage) => prevPage + 1);
    fetchClosedTickets(currentPageClosed + 1);
    console.log("loaded more");
  };

  return (
    <>
      <div className={`${styles.background}`}>
        <NavBar />
        <div className="flex h-screen w-full bg-gradient-to-tr from-azul4 via-azul3 to-azul1 ">
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
                      <Table.Row
                        key={ticket._id}
                        className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70"
                      >
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
              {currentPageOpen < totalPagesOpen ? (
                <Button
                  className="bg-azul2 drop-shadow-md mt-4"
                  onClick={loadNextOpenPage}
                >
                  Cargar mas tickets
                </Button>
              ) : (
                <Button className="bg-gray-400 drop-shadow-md mt-4">
                  No hay mas tickets disponibles
                </Button>
              )}
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
                      <Table.Row
                        key={ticket._id}
                        className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70"
                      >
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
              {currentPagePending < totalPagesPending ? (
                <Button
                  className="bg-azul2 drop-shadow-md mt-4"
                  onClick={loadNextPendingPage}
                >
                  Cargar mas tickets
                </Button>
              ) : (
                <Button className="bg-gray-400 drop-shadow-md mt-4">
                  No hay mas tickets disponibles
                </Button>
              )}
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
                      <Table.Row
                        key={ticket._id}
                        className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70"
                      >
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
              {currentPageClosed < totalPagesClosed ? (
                <Button
                  className="bg-azul2 drop-shadow-md mt-4"
                  onClick={loadNextClosedPage}
                >
                  Cargar mas tickets
                </Button>
              ) : (
                <Button className="bg-gray-400 drop-shadow-md mt-4">
                  No hay mas tickets disponibles
                </Button>
              )}
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
