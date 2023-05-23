import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import PetListPage from './pages/PetList'
import PetDetailPage from './pages/PetDetail'
import AppointmentListPage from './pages/AppointmentList'
import AppointmentDetailPage from './pages/AppointmentDetail'
import LoginPage from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <div className='container'>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<PetListPage />} />
          <Route path="/pets" element={<PetListPage />} />
          <Route path="/pets/:petId" element={<PetDetailPage />} />
          <Route path="/appointments" element={<AppointmentListPage />} />
          <Route path="/appointments/:appointmentId" element={<AppointmentDetailPage />} />
        </Routes>
      </div>
      </>
  )
}

export default App
