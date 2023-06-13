import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table";
import AppointmentsAdminContext from "../../contexts/AppointmentsAdminContext";

export default function AppointmentListAdminPage() {
  const { appointmentsLoading, listAppointments, appointmentList } = useContext(
    AppointmentsAdminContext
  );

  useEffect(() => {
    listAppointments();
  }, []);

  return (
    <>
      <h1>Turnos</h1>

      <Table
        headers={[
          {
            key: "user_fullname",
            label: "Cliente",
            wrapper: (value, appointment) => (
              <Link to={`/admin/users/${appointment.user}`}>{value}</Link>
            ),
          },
          {
            key: "pet_name",
            label: "Mascota",
            wrapper: (value, appointment) => (
              <Link to={`/admin/pets/${appointment.pet_id}`}>{value}</Link>
            ),
          },
          { key: "reason", label: "Motivo" },
          { key: "status", label: "Estado" },
          { key: "date", label: "Fecha" },
          {
            key: "hour",
            label: "Hora",
            wrapper: (value, appointment) =>
              appointment.hour || appointment.timeslot,
          },
          {
            wrapper: (value, appointment) => (
              <Link to={`/admin/appointments/${appointment.id}`}>
                Ver detalle
              </Link>
            ),
          },
        ]}
        data={appointmentList}
        loading={appointmentsLoading}
      />
    </>
  );
}
