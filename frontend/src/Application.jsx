import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./components/Test";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

const Application = () => {
  return (
    <Flowbite>
      <div className="grid place-items-center py-10 ">
        <DarkThemeToggle />
        <Routes>
          <Route path="/" element={<>Inicio</>} />
          <Route path="/comp" element={<Test />} />
          <Route path="/*" element={<>not found</>} />
        </Routes>
      </div>
    </Flowbite>
  );
};

export default Application;
