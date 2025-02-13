import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import "./index.css";
import Application from "./Application.jsx";
//import App from "./App.jsx";

const base = " " || process.env.PUBLIC_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router basename={base}>
      <Application />
    </Router>
    {/* <App />*/}
  </StrictMode>
);
