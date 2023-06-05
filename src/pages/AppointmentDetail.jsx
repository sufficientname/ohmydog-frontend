import { useContext, useEffect, useState } from "react";
import AppointmentsContext from "../contexts/AppointmentsContext";
import { useParams } from "react-router-dom";

function AppointmentDetailPage() {
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

  if (appointmentsLoading) {
    return <p>cargando...</p>;
  }

  return (
    <>
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
    </>
  );
}

export default AppointmentDetailPage;
