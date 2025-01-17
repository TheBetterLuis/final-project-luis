import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./components/Test";

const Application = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<>Inicio</>} />
        <Route path="/comp" element={<Test />} />
        <Route path="/*" element={<>not found</>} />
      </Routes>
    </div>
  );
};

export default Application;
