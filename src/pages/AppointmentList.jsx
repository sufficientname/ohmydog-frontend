import { useContext, useEffect } from "react";
import AppointmentsContext from "../contexts/AppointmentsContext";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/loader";
import Table from "../components/table";

export default function AppointmentListPage() {
  const { appointmentsLoading, listAppointments, appointmentList } =
    useContext(AppointmentsContext);
  const navigate = useNavigate();

  useEffect(() => {
    listAppointments();
  }, []);

  function onClick(event) {
    navigate("/appointments/create");
  }

  return (
    <Loader loading={appointmentsLoading}>
      <div className="float-right">
        <button className="button" onClick={onClick}>
          Solicitar turno
        </button>
      </div>

      <Table
        headers={[
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
  return <Link to={`/appointments/${appointment.id}`}>Ver detalle</Link>;
}
