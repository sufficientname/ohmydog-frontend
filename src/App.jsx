import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import PetListPage from "./pages/PetList";
import PetListAdminPage from "./pages/PetListAdmin";
import PetDetailPage from "./pages/PetDetail";
import PetDetailAdminPage from "./pages/PetDetailAdmin";
import PetCreatePage from "./pages/PetCreate";
import UserListAdminPage from "./pages/UserListAdmin";
import UserDetailAdminPage from "./pages/UserDetailAdmin";
import UserCreateAdminPage from "./pages/UserCreateAdmin";
import AppointmentListPage from "./pages/AppointmentList";
import AppointmentListAdminPage from "./pages/AppointmentListAdmin";
import AppointmentDetailPage from "./pages/AppointmentDetail";
import AppointmentDetailAdminPage from "./pages/AppointmentDetailAdmin";
import AppointmentCreatePage from "./pages/AppointmentCreate";
import AdoptionListPage from "./pages/AdoptionList";
import LoginPage from "./pages/Login";
import AuthContext from "./contexts/AuthContext";

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
          <Route path="/home" element={<p>og my dog</p>} />

          {isStaff ? (
            <>
              <Route path="admin/users" element={<UserListAdminPage />}></Route>
              <Route
                path="admin/users/:userId"
                element={<UserDetailAdminPage />}
              />
              <Route
                path="admin/users/create"
                element={<UserCreateAdminPage />}
              />
              <Route path="admin/pets" element={<PetListAdminPage />} />
              <Route
                path="admin/pets/:petId"
                element={<PetDetailAdminPage />}
              />
              <Route
                path="admin/appointments"
                element={<AppointmentListAdminPage />}
              />
              <Route
                path="admin/appointments/:appointmentId"
                element={<AppointmentDetailAdminPage />}
              />
            </>
          ) : null}

          {isCustomer ? (
            <>
              <Route path="/pets" element={<PetListPage />} />
              <Route path="/pets/:petId" element={<PetDetailPage />} />
              <Route path="/pets/create" element={<PetCreatePage />} />

              <Route path="/appointments" element={<AppointmentListPage />} />
              <Route
                path="/appointments/:appointmentId"
                element={<AppointmentDetailPage />}
              />
              <Route
                path="/appointments/create"
                element={<AppointmentCreatePage />}
              />
            </>
          ) : null}

          {true ? (
            <>
              <Route path="/adoptions" element={<AdoptionListPage />} />
            </>
          ) : null}

          {!isLogged ? <Route path="/login" element={<LoginPage />} /> : null}

          <Route path="*" element={<p>no se encontro</p>} />
        </Routes>
      </div>
    </>
  );
}
