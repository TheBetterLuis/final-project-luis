import {
  Button,
  Card,
  Label,
  Textarea,
  TextInput,
  FileInput,
  Datepicker,
} from "flowbite-react";

const TicketView = () => {
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
    <div className="py-2 bg-gradient-to-b from-[#EFFFFB] via-[#BFCCC8] to-[#8f9996]">
      <h1 className="drop-shadow-md text-center text-white text-xl pb-4">
        Ticket
      </h1>
      <Card className="max-w-sm bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
        <Card className="max-w-sm bg-[#074572] bg-opacity-25 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-black drop-shadow-2xl shadow-2xl">
          <form className="flex max-w-md flex-col gap-4 ">
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white drop-shadow-md"
                  htmlFor="titulo3"
                  value="TITULO"
                />
              </div>
              <TextInput
                id="titulo3"
                type="text"
                placeholder="titulo"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white drop-shadow-md"
                  htmlFor="descripcion3"
                  value="DESCRIPCION"
                />
              </div>
              <Textarea
                className="text-xs"
                id="descripcion3"
                placeholder="describe de que se trata este ticket"
                required
                rows={4}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white drop-shadow-md"
                  htmlFor="fecha3"
                  value="FECHA"
                />

                <Datepicker id="fecha3" minDate={new Date()} />
              </div>
            </div>
            <img
              src="../../public/vite.svg"
              alt="Meaningful alt text for an image that is not purely decorative"
            />

            <Button className="bg-azul2 drop-shadow-md" type="submit">
              <p>Guardar Ticket</p>
            </Button>
          </form>
        </Card>
      </Card>
    </div>
  );
};

export default TicketView;
