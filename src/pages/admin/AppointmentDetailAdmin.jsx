import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import AppointmentAcceptForm from "../../components/appointments/AppointmentAcceptForm";
import AppointmentRejectForm from "../../components/appointments/AppointmentRejectForm";
import AppointmentsAdminContext from "../../contexts/AppointmentsAdminContext";
import AppointmentCompleteForm from "../../components/appointments/AppointmentCompleteForm";

export default function AppointmentDetailAdminPage() {
  const params = useParams();
  const {
    appointmentsLoading,
    retrieveAppointment,
    appointmentDetail,
    acceptAppointment,
    acceptAppointmentError,
    rejectAppointment,
    rejectAppointmentError,
    completeAppointment,
    completeAppointmentError,
  } = useContext(AppointmentsAdminContext);

  useEffect(() => {
    retrieveAppointment(params.appointmentId);
  }, []);

  function onSubmitAcceptAppointment(data) {
    acceptAppointment(appointmentDetail, data);
  }

  function onSubmitRejectAppointment(data) {
    rejectAppointment(appointmentDetail, data);
  }

  function onSubmitCompleteAppointment(data) {
    completeAppointment(appointmentDetail, data);
  }

  return (
    <>
      <h1>Turno</h1>

      <Loader loading={appointmentsLoading}>
        <hr></hr>

        <div className="row">
          <div className="column">
            <div>
              <p>
                Cliente:{" "}
                <Link to={`/admin/users/${appointmentDetail.user_id}`}>
                  {appointmentDetail.user_full_name}
                </Link>
              </p>
              <p>
                Mascota:{" "}
                <Link to={`/admin/pets/${appointmentDetail.pet_id}`}>
                  {appointmentDetail.pet_name}
                </Link>
              </p>
              xw
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
          </div>

          <div className="column">
            {appointmentDetail.can_accept ? (
              <AppointmentAcceptForm
                appointment={appointmentDetail}
                onSubmit={onSubmitAcceptAppointment}
                errors={acceptAppointmentError}
              />
            ) : null}

            {appointmentDetail.can_reject ? (
              <AppointmentRejectForm
                appointment={appointmentDetail}
                onSubmit={onSubmitRejectAppointment}
                errors={rejectAppointmentError}
              />
            ) : null}

            {appointmentDetail.can_complete ? (
              <AppointmentCompleteForm
                appointment={appointmentDetail}
                onSubmit={onSubmitCompleteAppointment}
                errors={completeAppointmentError}
              />
            ) : null}
          </div>
        </div>
      </Loader>
    </>
  );
}
