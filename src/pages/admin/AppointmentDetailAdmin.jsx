import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import AppointmentAcceptForm from "../../components/appointments/AppointmentAcceptForm";
import AppointmentRejectForm from "../../components/appointments/AppointmentRejectForm";
import AppointmentsAdminContext from "../../contexts/AppointmentsAdminContext";

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

  return (
    <>
      <h1>Turno</h1>

      <Loader loading={appointmentsLoading}>
        <div>
          <p>Cliente: {appointmentDetail.user_fullname}</p>
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
            <AppointmentAcceptForm
              appointment={appointmentDetail}
              onSubmit={onSubmitAcceptAppointment}
              errors={acceptAppointmentError}
            />
          </div>

          <div className="column">
            <AppointmentRejectForm
              appointment={appointmentDetail}
              onSubmit={onSubmitRejectAppointment}
              errors={rejectAppointmentError}
            />
          </div>
        </div>
      </Loader>
    </>
  );
}