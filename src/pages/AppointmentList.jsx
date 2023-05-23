import { useContext, useEffect, useState } from 'react'
import AppointmentsContext from '../contexts/AppointmentsContext'
import Modal from 'react-modal'
import AppointmentRequestForm from '../components/appointments/AppointmentRequestForm';
import AppointmentsTable from '../components/appointments/AppointmentsTable';
import PetsContext from '../contexts/PetsContext';


function AppointmentListPage() {
  const { appointmentsLoading, listAppointments, appointmentList, createAppointment, createAppointmentError } = useContext(AppointmentsContext)
  const { petsLoading, listPets, petList } = useContext(PetsContext)

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    listAppointments()
    listPets()
  }, [])

  if (appointmentsLoading) {
    return <p>cargando...</p>
  }

  return (
    <>
      <div className='float-right'>
        <button className='button' onClick={openModal}>Solicitar turno</button>
      </div>

      <AppointmentsTable appointments={appointmentList} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <AppointmentRequestForm createAppointment={ createAppointment } createAppointmentError={ createAppointmentError } petList={ petList }/>
      </Modal>
    </>
  )
}

export default AppointmentListPage