import { Routes, Route } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import PetListPage from './pages/PetList'
import PetDetailPage from './pages/PetDetail'
import PetCreatePage from './pages/PetCreatePage'
import UserListAdminPage from './pages/UserListAdminPage'
import AppointmentListPage from './pages/AppointmentList'
import AppointmentListAdminPage from './pages/AppointmentListAdmin'
import AppointmentDetailPage from './pages/AppointmentDetail'
import AppointmentDetailAdminPage from './pages/AppointmentDetailAdmin'
import AppointmentCreatePage from './pages/AppointmentCreatePage'
import LoginPage from './pages/Login'
import AuthContext from './contexts/AuthContext'


function App() {
  const { userDetail, logout, retrieveUser } = useContext(AuthContext)

  useEffect(() => {
    retrieveUser()
  }, [])

  const isLogged = Object.keys(userDetail).length
  const isStaff = isLogged && userDetail.is_staff
  const isCustomer = isLogged && !userDetail.is_staff

  return (
    <>
      <Navbar logout={logout} userDetail={userDetail} />

      <div className='container'>
        <Routes>
          <Route path="/home" element={<p>og my dog</p>} />

          { isStaff ?
            <>
              <Route path="admin/users" element={<UserListAdminPage />}></Route>
              <Route path="admin/appointments" element={<AppointmentListAdminPage />} />
              <Route path="admin/appointments/:appointmentId" element={<AppointmentDetailAdminPage />} />
              <Route path="admin/pets" element={<PetListPage />} />
              <Route path="admin/pets/:petId" element={<PetDetailPage />} />
            </>
            : null
          }

          { isCustomer
            ? <>
              <Route path="/pets" element={<PetListPage />} />
              <Route path="/pets/:petId" element={<PetDetailPage />} />
              <Route path="/pets/create" element={<PetCreatePage />} />
              <Route path="/appointments" element={<AppointmentListPage />} />
              <Route path="/appointments/:appointmentId" element={<AppointmentDetailPage />} />
              <Route path="/appointments/create" element={<AppointmentCreatePage />} />
            </>
            : null
          }

          { !isLogged
            ? <Route path="/login" element={ <LoginPage /> } />
            : null
          }

          <Route path='*' element={ <p>no se encontro</p> }/>
        </Routes>
      </div>
    </>
  )
}

export default App