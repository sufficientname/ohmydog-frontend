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

// admin pages
import PetListAdminPage from "./pages/admin/PetListAdmin";
import PetDetailAdminPage from "./pages/admin/PetDetailAdmin";
import UserListAdminPage from "./pages/admin/UserListAdmin";
import UserDetailAdminPage from "./pages/admin/UserDetailAdmin";
import UserCreateAdminPage from "./pages/admin/UserCreateAdmin";
import AppointmentListAdminPage from "./pages/admin/AppointmentListAdmin";
import AppointmentDetailAdminPage from "./pages/admin/AppointmentDetailAdmin";

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
              <Route path="admin/users" element={<UserListAdminPage />} />
              <Route
                path="admin/users/:userId"
                element={<UserDetailAdminPage />}
              />
              <Route
                path="admin/users/create"
                element={<UserCreateAdminPage />}
              />

              {/* pets */}
              {/* <Route path="admin/pets" element={<PetListAdminPage />} /> */}
              <Route
                path="admin/pets/:petId"
                element={<PetDetailAdminPage />}
              />

              {/* appointments */}
              <Route
                path="admin/appointments"
                element={<AppointmentListAdminPage />}
              />
              <Route
                path="admin/appointments/:appointmentId"
                element={<AppointmentDetailAdminPage />}
              />

              {/* adoptions */}
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
            </>
          ) : null}

          {/* Public routes */}
          {!isLogged ? (
            <>
              <Route path="/adoptions" element={<AdoptionListPublicPage />} />
            </>
          ) : null}

          {!isLogged ? <Route path="/login" element={<LoginPage />} /> : null}

          <Route path="*" element={<p>no se encontro</p>} />
        </Routes>
      </div>
    </>
  );
}
