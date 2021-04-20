import React from "react";
import "./App.scss";
import "./index.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import ProductContextProvider from "./context/productContext";

import App from "./App";

ReactDOM.render(
  <AuthContextProvider>
    <ProductContextProvider>
      <Router>
        <App />
      </Router>
    </ProductContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
