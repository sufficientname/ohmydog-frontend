import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

  function onClickCancelAppointment(event) {
    cancelAppointment(appointmentDetail);
  }

  return (
    <>
      <h1>Turno</h1>

      <Loader loading={appointmentsLoading}>
        {appointmentDetail.can_cancel ? (
          <div className="row">
            <div className="column">
              <button
                className="button container"
                onClick={onClickCancelAppointment}
              >
                Cancelar turno
              </button>
            </div>
          </div>
        ) : null}

        <hr></hr>

        <div>
          <p>
            Mascota:{" "}
            <Link to={`/pets/${appointmentDetail.pet}`}>
              {appointmentDetail.pet_name}
            </Link>
          </p>
          <p>Motivo: {appointmentDetail.reason}</p>
          <p>Fecha solicitada: {appointmentDetail.date}</p>
          <p>Franja horaria solicitada: {appointmentDetail.timeslot}</p>
          <p>Fecha fijada: {appointmentDetail.date}</p>
          <p>Hora fijada: {appointmentDetail.hour}</p>
          <p>Fecha sugerida: {appointmentDetail.suggestion_date}</p>
          <p>Estado: {appointmentDetail.status}</p>
          <p>Observaciones: {appointmentDetail.observations}</p>
          <p>Precio: {appointmentDetail.price}</p>
          <p>Monto descontado: {appointmentDetail.discount_amount}</p>
          <p>Monto abonado: {appointmentDetail.paid_amount}</p>
        </div>
      </Loader>
    </>
  );
}
