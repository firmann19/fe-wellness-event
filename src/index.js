import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./styles/LoginPage.css";
import "./styles/Utilities.css";
import "./styles/Navbar.css";
import "./styles/Footer.css";
import "./styles/CardPerformance.css";
import "./styles/CreateEvent.css";
import'./styles/DetailForm.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
