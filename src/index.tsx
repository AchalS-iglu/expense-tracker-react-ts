import React from "react";
import ReactDOM from "react-dom/client";

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
