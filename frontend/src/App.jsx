import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Test from "./components/Test";
import { Button } from "flowbite-react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Flowbite>
        <Button>This is a flowbite button</Button>
      </Flowbite>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="bg-[#dddcdc] dark:bg-[#333] text-[#333] dark:text-[#dddcdc]  grid place-items-center">
        <p className="text-[#333] dark:text-[#dddcdc] hover:text-[#878787] dark:hover:text-[#fff]">
          Puedes probar cambiar al modo oscuro/claro
        </p>

        <DarkThemeToggle></DarkThemeToggle>
        <p className="text-[#333] dark:text-[#dddcdc] hover:text-[#878787] dark:hover:text-[#fff]">
          Ya esta instalado tailwind
        </p>
        <Test />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
