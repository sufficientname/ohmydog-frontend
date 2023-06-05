import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PetsContextProvider } from "./contexts/PetsContext";

import { AppointmentsContextProvider } from "./contexts/AppointmentsContext";
import { AppointmentsAdminContextProvider } from "./contexts/AppointmentsAdminContext";
import { PetsAdminContextProvider } from "./contexts/PetsAdminContext";

import { UsersContextProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <UsersContextProvider>
      <PetsContextProvider>
        <PetsAdminContextProvider>
          <AppointmentsContextProvider>
            <AppointmentsAdminContextProvider>
              <App />
            </AppointmentsAdminContextProvider>
          </AppointmentsContextProvider>
        </PetsAdminContextProvider>
      </PetsContextProvider>
    </UsersContextProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);
