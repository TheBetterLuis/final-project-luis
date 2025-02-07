import { Checkbox } from "flowbite-react";
import { Table } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import PageFooter from "../components/Footer";
import CustomSidebar from "../components/CustomSidebar";

const DashboardPage = () => {
  const styles = {
    background: "bg-gradient-to-tr from-azul4 via-[#52A2AB] to-azul1",
    background_feed:
      "bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]",
  };

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
                pendientes
              </button>
              <br />
              <Table className="drop-shadow-2xl ">
                <Table.Body className="divide-y bg-white/19">
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
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
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
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
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                      {"Internet Lento"}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
        <PageFooter />
        <CustomSidebar />
      </div>
    </>
  );
};

export default DashboardPage;
