import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table";
import AppointmentsAdminContext from "../../contexts/AppointmentsAdminContext";
import SearchAppointmentAdminForm from "../../components/appointments/SearchAppointmentAdminForm";
import { Today } from "../../utils/datetime";

export default function AppointmentListAdminPage() {
  const { appointmentsLoading, listAppointments, appointmentList } = useContext(
    AppointmentsAdminContext
  );

  const [step, setStep] = useState(0);

  useEffect(() => {
    const today = Today().toISOString().split("T")[0];
    listAppointments({ date_after: today, date_before: today, status: "ACE" });
  }, []);

  function onSubmitSearch(data) {
    listAppointments(data);
  }

  function onClickTodayAppointments(event) {
    setStep(0);
    const today = Today().toISOString().split("T")[0];
    listAppointments({ date_after: today, date_before: today, status: "ACE" });
  }

  function onClickAppointmentsRequests(event) {
    setStep(1);
    const today = Today().toISOString().split("T")[0];
    listAppointments({ date_after: today, status: "PEN" });
  }

  function onClickAllAppointments(event) {
    setStep(2);
    listAppointments();
  }

  return (
    <>
      <h1>Turnos</h1>

      <hr></hr>

      <div className="row">
        <div className="column">
          <button
            className="button container"
            onClick={onClickTodayAppointments}
          >
            Turnos de hoy
          </button>
        </div>

        <div className="column">
          <button
            className="button container"
            onClick={onClickAppointmentsRequests}
          >
            Solicitudes pendientes
          </button>
        </div>

        <div className="column">
          <button className="button container" onClick={onClickAllAppointments}>
            Todos los turnos
          </button>
        </div>
      </div>

      {step == 2 ? (
        <SearchAppointmentAdminForm onSubmit={onSubmitSearch} />
      ) : null}

      <Table
        headers={[
          {
            key: "user_full_name",
            label: "Cliente",
            wrapper: (value, appointment) => (
              <Link to={`/admin/users/${appointment.user}`}>{value}</Link>
            ),
          },
          {
            key: "pet_name",
            label: "Mascota",
            wrapper: (value, appointment) => (
              <Link to={`/admin/pets/${appointment.pet}`}>{value}</Link>
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
