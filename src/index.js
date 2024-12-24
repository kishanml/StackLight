import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./index.css";
import { HashRouter,  Route, Routes } from "react-router-dom";
import Component from "./Component";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route exact path={"/"} element={<App />} />
        <Route exact path={"/component"} element={<Component />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
