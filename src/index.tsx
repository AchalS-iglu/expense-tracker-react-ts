import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import App from "./App";
import { AuthContextProvider } from "./lib/Firebase/AuthContext";
import { DBContextProvider } from "./lib/Firebase/DBContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DBContextProvider>
        <App />
      </DBContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
