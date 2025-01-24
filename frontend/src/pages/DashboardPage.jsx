import { Drawer, Checkbox } from "flowbite-react";
import { useState } from "react";
import { Table } from "flowbite-react";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  return (
    <div className="flex h-screen w-full bg-gradient-to-tr from-azul4 via-azul3 to-azul1">
      <button className="block sm:hidden" onClick={() => setIsOpen(true)}>
        Show navigation
      </button>
      <Drawer
        className="bg-white/0 block sm:hidden"
        open={isOpen}
        onClose={handleClose}
      >
        <div className="flex flex-col bg-white/40 border-r-2 border-gray-400 w-1/6 h-full justify-start items-center">
          <br />
          <div className="relative rounded-full overflow-hidden border-2 border-azul4 shadow-2xl">
            <img
              src="../../public/img/persona3.avif"
              alt=""
              className="object-cover h-36 w-36 drop-shadow-2xl"
            />
          </div>
          <br />
          <div className="flex flex-col space-y-4">
            <button className="bg-azul4 text-white px-6 py-3 rounded-lg ">
              Pedro Herrera
            </button>
            <button className="bg-azul4 text-white px-6 py-3 rounded-lg ">
              Chat
            </button>
            <button className="bg-azul4 text-white px-6 py-3 rounded-lg ">
              Tickets
            </button>
          </div>
        </div>
      </Drawer>
      <div className="hidden sm:block sm:w-1/6 sm:h-full">
        <div className="flex flex-col bg-white/40 border-r-2 border-gray-400 w-full h-full justify-start items-center">
          <br />
          <div className="relative rounded-full overflow-hidden border-2 border-azul4 shadow-2xl">
            <img
              src="../../public/img/persona3.avif"
              alt=""
              className="object-cover h-36 w-36 drop-shadow-2xl"
            />
          </div>
          <br />
          <div className="flex flex-col space-y-4">
            <button className="bg-azul4 text-white px-6 py-3 rounded-lg drop-shadow-lg hover:-translate-y-1 hover:scale-110  duration-300  ">
              Pedro Herrera
            </button>
            <button className="bg-azul4 text-white px-6 py-3 rounded-lg drop-shadow-lg hover:-translate-y-1 hover:scale-110  duration-300  ">
              Chat
            </button>
            <button className="bg-azul4 text-white px-6 py-3 rounded-lg drop-shadow-lg hover:-translate-y-1 hover:scale-110  duration-300  ">
              Tickets
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto sm:flex-row items-center justify-around w-full h-full ">
        <div className="flex flex-col items-center justify-around">
          <button className="bg-azul4 text-white px-10 py-3 sm:px-16 sm:py-5 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg text-center">
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
          <button className="bg-azul4 text-white px-10 py-3 sm:px-16 sm:py-5 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg text-center">
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
          <button className="bg-azul4 text-white px-10 py-3 sm:px-16 sm:py-5 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg text-center">
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
  );
};

export default Dashboard;
