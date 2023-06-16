import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { LoadScript } from "@react-google-maps/api";

const key = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoadScript googleMapsApiKey={key} libraries={["places"]}>
  <BrowserRouter>
    <Provider store={store}>
      <>
        <App />
      </>
    </Provider>
  </BrowserRouter>
  </LoadScript>
);
