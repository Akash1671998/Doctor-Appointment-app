import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./contex";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter basename="/appointment/app">
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>
);
