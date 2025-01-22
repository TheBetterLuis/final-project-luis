import { Card } from "flowbite-react";

export function Tarjeta() {
  return (
    <Card className="max-w-sm w-2/3">
      
      <div className="flex flex-col items-center pb-10 w-full">
        <img className="mb-3 w-1/3 h-1/3 rounded-full shadow-lg border-2" src="../../public/img/persona1.jpg" alt="foto perfil" />
        
        <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>

        <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col items-center justify-between w-full">
          <h1 className="text-xl text-gray-500 dark:text-gray-300">TICKET</h1>
          <h6 className="text-4xl font-bold text-gray-900 dark:text-black">20</h6>
        </div>
          <span className="text-xl font-bold text-[#928F74]">FREE</span>
        <div className="flex flex-col items-center justify-between w-full">
          <h1 className="text-xl text-gray-500 dark:text-gray-300">LIKES</h1>
          <h6 className="text-4xl font-bold text-gray-900 dark:text-black">200</h6>
        </div>
        </div>
      </div>
    </Card>
  );
}

export default Tarjeta;