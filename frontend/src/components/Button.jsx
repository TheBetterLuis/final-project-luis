import { Button } from "flowbite-react";
function Boton({ message = null }) {
  return (
    <>
      <Button className="bg-azul2 text-gray-100 rounded px-10 py-2 drop-shadow-lg hover:-translate-y-1 hover:scale-110  duration-300 ">
        {message === null && "envia un mensaje como prop, message={}"}
        {message !== null && message}
      </Button>
    </>
  );
}

export default Boton;
