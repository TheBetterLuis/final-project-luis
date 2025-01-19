import { Button, Card, Checkbox } from "flowbite-react";

const TicketList = () => {
  /*
    colors: {
      azul1: "#9CFFE5",
      azul2: "#6C9DFF",
      azul3: "#4491A1",
      azul4: "#074572",
      azul5: "#0B2545",
      azul6: "#00171F",
    }
    */

  return (
    <div className="py-2">
      <Card className="max-w-sm bg-azul4 drop-shadow-md text-center text-white text-xl  mb-4 border-azul4 ">
        <h1 className=" ">Tickets pendientes</h1>
      </Card>
      <Card className=" bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
        <div className="flex place-items-center gap-6">
          <Checkbox className="scale-150 border-azul4 border-2  opacity-80" />
          <Button className="bg-[#F9F8F8] opacity-80 text-black border-[#C9C9C9]">
            Internet Lento
          </Button>
        </div>
        <div className="flex place-items-center gap-6">
          <Checkbox className="scale-150 border-azul4 border-2 opacity-80" />
          <Button className="bg-[#F9F8F8] opacity-80 text-black border-[#C9C9C9]">
            Internet Lento
          </Button>
        </div>
        <div className="flex place-items-center gap-6">
          <Checkbox className="scale-150 border-azul4 border-2 opacity-80" />
          <Button className="bg-[#F9F8F8] opacity-80 text-black border-[#C9C9C9] ">
            Internet Lento
          </Button>
        </div>
        <div className="flex place-items-center gap-6">
          <Checkbox className="scale-150 border-azul4 border-2 opacity-80" />
          <Button className="bg-[#F9F8F8] opacity-80 text-black border-[#C9C9C9] ">
            Internet Lento
          </Button>
        </div>
        <div className="flex place-items-center gap-6">
          <Checkbox className="scale-150 border-azul4 border-2 opacity-80" />
          <Button className="bg-[#F9F8F8] opacity-80 text-black border-[#C9C9C9] ">
            Internet Lento
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TicketList;
