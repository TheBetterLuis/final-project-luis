import { Button, Card, Label, TextInput } from "flowbite-react";

const Register = () => {
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
      <h1 className="drop-shadow-md text-center text-white text-xl pb-4">
        Registro
      </h1>
      <Card className="max-w-sm bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
        <form className="flex max-w-md flex-col gap-4 ">
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white drop-shadow-md"
                htmlFor="nombre2"
                value="NOMBRE"
              />
            </div>
            <TextInput id="nombre2" type="text" placeholder="nombre" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white drop-shadow-md"
                htmlFor="apellido2"
                value="APELLIDO"
              />
            </div>
            <TextInput
              id="apellido2"
              type="text"
              placeholder="apellido"
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                className="text-white drop-shadow-md"
                htmlFor="email2"
                value="EMAIL"
              />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white drop-shadow-md"
                htmlFor="password2"
                value="CONTRASEÑA"
              />
            </div>
            <TextInput id="password2" type="password" required />
          </div>
          <Button className="bg-azul2 drop-shadow-md" type="submit">
            <p>Registrarse</p>
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
