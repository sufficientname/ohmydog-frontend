import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import AppointmentsContext from "../../contexts/AppointmentsContext";

export default function AppointmentDetailPage() {
  const params = useParams();
  const {
    appointmentsLoading,
    retrieveAppointment,
    appointmentDetail,
    cancelAppointment,
  } = useContext(AppointmentsContext);

  useEffect(() => {
    retrieveAppointment(params.appointmentId);
  }, []);

  function OnClickCancelAppointment() {
    cancelAppointment(appointmentDetail);
  }

  return (
    <>
      <h1>Turno</h1>

      <Loader loading={appointmentsLoading}>
        {appointmentDetail.booster_date ? (
          <pre>
            <code>{`Fecha para el refuerzo: ${appointmentDetail.booster_date}`}</code>
          </pre>
        ) : null}

        <div>
          <p>Mascota: {appointmentDetail.pet_name}</p>
          <p>Motivo: {appointmentDetail.reason}</p>
          <p>Fecha solicitada: {appointmentDetail.date}</p>
          <p>Franja horaria solicitada: {appointmentDetail.timeslot}</p>
          <p>Fecha fijada: {appointmentDetail.date}</p>
          <p>Hora fijada: {appointmentDetail.hour}</p>
          <p>Fecha sugerida: {appointmentDetail.suggestion_date}</p>
          <p>Estado: {appointmentDetail.status}</p>
        </div>

        <div className="row">
          <div className="column">
            <button
              className="button"
              onClick={OnClickCancelAppointment}
              disabled={!appointmentDetail.can_cancel}
            >
              Cancelar turno
            </button>
          </div>
        </div>
      </Loader>
    </>
  );
}