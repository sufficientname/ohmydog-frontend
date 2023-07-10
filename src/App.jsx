import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import Navbar from "./components/navbar/Navbar";

// auth pages
import LoginPage from "./pages/Login";
import LoginSetPasswordPage from "./pages/LoginSetPassword";

// public pages
import HomePage from "./pages/public/Home";
import AdoptionListPublicPage from "./pages/public/AdoptionListPublic";
import AdoptionDetailPublicPage from "./pages/public/AdoptionDetailPublic";
import PetSearchListPublicPage from "./pages/public/PetSearchListPublic";
import PetSearchDetailPublicPage from "./pages/public/PetSearchDetailPublic";
import PetSitterListPublicPage from "./pages/public/PetSitterListPublic";
import PetSitterDetailPublicPage from "./pages/public/PetSitterDetailPublic";
import CampaignListPublicPage from "./pages/public/CampaignListPublic";
import CampaignDetailPublicPage from "./pages/public/CampaignDetailPublic";

// customer pages
import PetListPage from "./pages/customers/PetList";
import PetDetailPage from "./pages/customers/PetDetail";
import PetCreatePage from "./pages/customers/PetCreate";
import AppointmentListPage from "./pages/customers/AppointmentList";
import AppointmentDetailPage from "./pages/customers/AppointmentDetail";
import AppointmentCreatePage from "./pages/customers/AppointmentCreate";
import AdoptionListPage from "./pages/customers/AdoptionList";
import AdoptionDetailPage from "./pages/customers/AdoptionDetail";
import AdoptionCreatePage from "./pages/customers/AdoptionCreate";
import PetSearchListPage from "./pages/customers/PetSearchList";
import PetSearchDetailPage from "./pages/customers/PetSearchDetail";
import PetSearchCreatePage from "./pages/customers/PetSearchCreate";
import PetSitterListPage from "./pages/customers/PetSitterList";
import PetSitterDetailPage from "./pages/customers/PetSitterDetail";
import CampaignListPage from "./pages/customers/CampaignList";
import CampaignDetailPage from "./pages/customers/CampaignDetail";

// admin pages
import PetListAdminPage from "./pages/admin/PetListAdmin";
import PetDetailAdminPage from "./pages/admin/PetDetailAdmin";
import UserListAdminPage from "./pages/admin/UserListAdmin";
import UserDetailAdminPage from "./pages/admin/UserDetailAdmin";
import UserCreateAdminPage from "./pages/admin/UserCreateAdmin";
import AppointmentListAdminPage from "./pages/admin/AppointmentListAdmin";
import AppointmentDetailAdminPage from "./pages/admin/AppointmentDetailAdmin";
import AdoptionListAdminPage from "./pages/admin/AdoptionListAdmin";
import AdoptionDetailAdminPage from "./pages/admin/AdoptionDetailAdmin";
import PetSearchListAdminPage from "./pages/admin/PetSearchListAdmin";
import PetSearchDetailAdminPage from "./pages/admin/PetSearchDetailAdmin";
import PetSitterListAdminPage from "./pages/admin/PetSitterListAdmin";
import PetSitterDetailAdminPage from "./pages/admin/PetSitterDetailAdmin";
import PetSitterCreateAdminPage from "./pages/admin/PetSitterCreateAdmin";
import CampaignListAdminPage from "./pages/admin/CampaignListAdmin";
import CampaignDetailAdminPage from "./pages/admin/CampaignDetailAdmin";
import CampaignCreateAdminPage from "./pages/admin/CampaignCreateAdmin";

export default function App() {
  const { userDetail, logout, retrieveUser } = useContext(AuthContext);

  useEffect(() => {
    retrieveUser();
  }, []);

  const isLogged = Object.keys(userDetail).length;
  const isStaff = isLogged && userDetail.is_staff;
  const isCustomer = isLogged && !userDetail.is_staff;

  return (
    <>
      <Navbar logout={logout} userDetail={userDetail} />

      <div className="container">
        <Routes>
          <Route path="/home" element={<HomePage />} />

          {/* Staff routes */}
          {isStaff ? (
            <>
              {/* users */}
              <Route path="/admin/users" element={<UserListAdminPage />} />
              <Route
                path="/admin/users/:userId"
                element={<UserDetailAdminPage />}
              />
              <Route
                path="/admin/users/create"
                element={<UserCreateAdminPage />}
              />

              {/* pets */}
              {/* <Route path="/admin/pets" element={<PetListAdminPage />} /> */}
              <Route
                path="/admin/pets/:petId"
                element={<PetDetailAdminPage />}
              />

              {/* appointments */}
              <Route
                path="/admin/appointments"
                element={<AppointmentListAdminPage />}
              />
              <Route
                path="/admin/appointments/:appointmentId"
                element={<AppointmentDetailAdminPage />}
              />

              {/* adoptions */}
              <Route
                path="/admin/adoptions"
                element={<AdoptionListAdminPage />}
              />
              <Route
                path="/admin/adoptions/:adoptionId"
                element={<AdoptionDetailAdminPage />}
              />

              {/* petsearches */}
              <Route
                path="/admin/petsearches"
                element={<PetSearchListAdminPage />}
              />
              <Route
                path="/admin/petsearches/:petSearchId"
                element={<PetSearchDetailAdminPage />}
              />

              {/* petsitters */}
              <Route
                path="/admin/petsitters"
                element={<PetSitterListAdminPage />}
              />
              <Route
                path="/admin/petsitters/:petSitterId"
                element={<PetSitterDetailAdminPage />}
              />
              <Route
                path="/admin/petsitters/create"
                element={<PetSitterCreateAdminPage />}
              />

              {/* campaigns */}
              <Route
                path="/admin/campaigns"
                element={<CampaignListAdminPage />}
              />
              <Route
                path="/admin/campaigns/:campaignId"
                element={<CampaignDetailAdminPage />}
              />
              <Route
                path="/admin/campaigns/create"
                element={<CampaignCreateAdminPage />}
              />
            </>
          ) : null}

          {/* Customer routes */}
          {isCustomer ? (
            <>
              <Route
                path="/login/set-password"
                element={<LoginSetPasswordPage />}
              />

              {/* pets */}
              <Route path="/pets" element={<PetListPage />} />
              <Route path="/pets/:petId" element={<PetDetailPage />} />
              <Route path="/pets/create" element={<PetCreatePage />} />

              {/* appointments */}
              <Route path="/appointments" element={<AppointmentListPage />} />
              <Route
                path="/appointments/:appointmentId"
                element={<AppointmentDetailPage />}
              />
              <Route
                path="/appointments/create"
                element={<AppointmentCreatePage />}
              />

              {/* adoptions */}
              <Route path="/adoptions" element={<AdoptionListPage />} />
              <Route
                path="/adoptions/:adoptionId"
                element={<AdoptionDetailPage />}
              />
              <Route
                path="/adoptions/create"
                element={<AdoptionCreatePage />}
              />

              {/* petsearches */}
              <Route path="/petsearches" element={<PetSearchListPage />} />
              <Route
                path="/petsearches/:petSearchId"
                element={<PetSearchDetailPage />}
              />
              <Route
                path="/petsearches/create"
                element={<PetSearchCreatePage />}
              />

              {/* petsitters */}
              <Route path="/petsitters" element={<PetSitterListPage />} />
              <Route
                path="/petsitters/:petSitterId"
                element={<PetSitterDetailPage />}
              />

              {/* campaigns */}
              <Route path="/campaigns" element={<CampaignListPage />} />
              <Route
                path="/campaigns/:campaignId"
                element={<CampaignDetailPage />}
              />
            </>
          ) : null}

          {/* Public routes */}
          {!isLogged ? (
            <>
              {/* adoptions */}
              <Route path="/adoptions" element={<AdoptionListPublicPage />} />
              <Route
                path="/adoptions/:adoptionId"
                element={<AdoptionDetailPublicPage />}
              />

              {/* petsearches */}
              <Route
                path="/petsearches"
                element={<PetSearchListPublicPage />}
              />
              <Route
                path="/petsearches/:petSearchId"
                element={<PetSearchDetailPublicPage />}
              />

              {/* petsitters */}
              <Route path="/petsitters" element={<PetSitterListPublicPage />} />
              <Route
                path="/petsitters/:petSitterId"
                element={<PetSitterDetailPublicPage />}
              />

              {/* campaigns */}
              <Route path="/campaigns" element={<CampaignListPublicPage />} />
              <Route
                path="/campaigns/:campaignId"
                element={<CampaignDetailPublicPage />}
              />
            </>
          ) : null}

          {!isLogged ? <Route path="/login" element={<LoginPage />} /> : null}

          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </>
  );
}
