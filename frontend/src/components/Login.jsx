import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

const Login = () => {
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
        Inicio de sesion
      </h1>
      <Card className="max-w-sm bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
        <form className="flex max-w-md flex-col gap-4 ">
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white drop-shadow-md"
                htmlFor="email1"
                value="CORREO"
              />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white drop-shadow-md"
                htmlFor="password1"
                value="CONTRASEÑA"
              />
            </div>
            <TextInput id="password1" type="password" required />
          </div>
          {/*<div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">remember me</Label>
          </div>*/}
          <Button className="bg-azul2 drop-shadow-md" type="submit">
            <p>Iniciar Sesion</p>
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
