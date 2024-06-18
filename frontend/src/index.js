import React from "react";
import ReactDOM from "react-dom/client";
import "./CSS/index.css";
import "./CSS/constants.css";
import "./CSS/all.min.css";
import "./CSS/global.css";
import "./CSS/normalize.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
