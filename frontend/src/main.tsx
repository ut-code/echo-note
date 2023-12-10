import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { BASE_URL } from "./config/apiConfig";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
