import { Drawer } from "flowbite-react";
import CRUD from "../components/CRUD";
import { useState } from "react";

const Admincrud = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  return (
    <div className="flex h-screen w-full bg-gradient-to-tr from-azul1 via-azul3 to-azul4">
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
      <div className="flex flex-col w-full h-screen justify-evenly items-center">
        <div className="flex flex-row justify-center items-center space-x-4 sm:space-x-80">
          <button className="bg-azul4 text-white px-10 py-3 sm:px-20 sm:py-6 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg">
            Usuarios
          </button>
          <button className="bg-azul4 text-white px-10 py-3 sm:px-20 sm:py-6 rounded-lg text-xl hover:-translate-y-1 hover:scale-110  duration-300  drop-shadow-lg">
            Tecnicos
          </button>
        </div>
        <CRUD />
      </div>
    </div>
  );
};

export default Admincrud;
