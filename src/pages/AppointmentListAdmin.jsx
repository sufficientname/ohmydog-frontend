import { useContext, useEffect } from "react";
import AppointmentsAdminContext from "../contexts/AppointmentsAdminContext";
import AppointmentsTable from "../components/appointments/AppointmentsTableAdmin";

function AppointmentListAdminPage() {
  const { appointmentsLoading, listAppointments, appointmentList } = useContext(
    AppointmentsAdminContext
  );

  useEffect(() => {
    listAppointments();
  }, []);

  if (appointmentsLoading) {
    return <p>cargando...</p>;
  }

  return (
    <>
      <AppointmentsTable appointments={appointmentList} />
    </>
  );
}

export default AppointmentListAdminPage;
