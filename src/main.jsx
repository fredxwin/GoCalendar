import React from "react";
import ReactDOM from "react-dom/client";
import { Calendar } from "./Calendar";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Calendar date="2022-10-24" />
  </React.StrictMode>
);
