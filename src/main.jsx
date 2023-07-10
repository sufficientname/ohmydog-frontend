import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PetsContextProvider } from "./contexts/PetsContext";
import { PetsAdminContextProvider } from "./contexts/PetsAdminContext";
import { AppointmentsContextProvider } from "./contexts/AppointmentsContext";
import { AppointmentsAdminContextProvider } from "./contexts/AppointmentsAdminContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { UsersContextProvider } from "./contexts/UsersAdminContext";
import { AdoptionsContextProvider } from "./contexts/AdoptionsContext";
import { AdoptionsAdminContextProvider } from "./contexts/AdoptionsAdminContext";
import { PetSearchesContextProvider } from "./contexts/PetSearchesContext";
import { PetSearchesAdminContextProvider } from "./contexts/PetSearchesAdminContext";
import { PetSittersContextProvider } from "./contexts/PetSittersContext";
import { PetSittersAdminContextProvider } from "./contexts/PetSittersAdminContext";
import { CampaignsContextProvider } from "./contexts/CampaignsContext";
import { CampaignsAdminContextProvider } from "./contexts/CampaignsAdminContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <UsersContextProvider>
        <PetsContextProvider>
          <PetsAdminContextProvider>
            <AppointmentsContextProvider>
              <AppointmentsAdminContextProvider>
                <AdoptionsContextProvider>
                  <AdoptionsAdminContextProvider>
                    <PetSearchesContextProvider>
                      <PetSearchesAdminContextProvider>
                        <PetSittersContextProvider>
                          <PetSittersAdminContextProvider>
                            <CampaignsContextProvider>
                              <CampaignsAdminContextProvider>
                                <App />
                              </CampaignsAdminContextProvider>
                            </CampaignsContextProvider>
                          </PetSittersAdminContextProvider>
                        </PetSittersContextProvider>
                      </PetSearchesAdminContextProvider>
                    </PetSearchesContextProvider>
                  </AdoptionsAdminContextProvider>
                </AdoptionsContextProvider>
              </AppointmentsAdminContextProvider>
            </AppointmentsContextProvider>
          </PetsAdminContextProvider>
        </PetsContextProvider>
      </UsersContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);
