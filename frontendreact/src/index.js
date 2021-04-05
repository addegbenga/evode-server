import React from "react";
import "./App.scss";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./context/authContext";

import App from "./App";

ReactDOM.render(
  <AuthContextProvider>
    <Router>
      <App />
    </Router>
  </AuthContextProvider>,
  document.getElementById("root")
);
