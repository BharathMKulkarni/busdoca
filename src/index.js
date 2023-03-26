import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/material/styles";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Fragment>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Fragment>
);

