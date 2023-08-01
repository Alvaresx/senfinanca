import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </StyledEngineProvider>
);
