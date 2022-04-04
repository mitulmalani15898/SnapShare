import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import theme from "./theme";
import { AccountProvider } from "./AccountProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AccountProvider>
        <CssBaseline />
        <App />
      </AccountProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
