import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppointmentsAdminContext from "../contexts/AppointmentsAdminContext";
import Loader from "../components/loader";
import Table from "../components/table";

export default function AppointmentListAdminPage() {
  const { appointmentsLoading, listAppointments, appointmentList } = useContext(
    AppointmentsAdminContext
  );

  useEffect(() => {
    listAppointments();
  }, []);

  return (
    <Loader loading={appointmentsLoading}>
      <Table
        headers={[
          { key: "user_fullname", name: "Cliente" },
          { key: "pet_name", name: "Mascota", wrapper: petNameWrapper },
          { key: "reason", name: "Motivo" },
          { key: "date", name: "Fecha" },
          { key: "hour", name: "Hora", wrapper: hourWrapper },
          { wrapper: seeDetailWrapper },
        ]}
        data={appointmentList}
      />
    </Loader>
  );
}

function petNameWrapper(value, appointment) {
  return <Link to={`/pets/${appointment.pet_id}`}>{value}</Link>;
}

function hourWrapper(value, appointment) {
  return appointment.hour || appointment.timeslot;
}

function seeDetailWrapper(value, appointment) {
  return <Link to={`/admin/appointments/${appointment.id}`}>Ver detalle</Link>;
}
