import { useContext, useEffect, useState } from 'react'
import AppointmentsAdminContext from '../contexts/AppointmentsAdminContext'
import { useParams } from 'react-router-dom';
import { getDateMonthYear, getHoursAndMinutes } from '../utils/datetime'
import { canCancelAppointment } from '../utils/appointments'
import AppointmentAcceptForm from '../components/appointments/AppointmentAcceptForm'
import AppointmentRejectForm from '../components/appointments/AppointmentRejectForm'


function AppointmentDetailAdminPage() {
    const params = useParams()
    const { appointmentsLoading, retrieveAppointment, appointmentDetail, acceptAppointment, acceptAppointmentError, rejectAppointment, rejectAppointmentError } = useContext(AppointmentsAdminContext)

    useEffect(() => {
        retrieveAppointment(params.appointmentId)
    }, [])

    const request_date = appointmentDetail.request_date ? new Date(appointmentDetail.request_date) : null
    const actual_datetime = appointmentDetail.actual_datetime ? new Date(appointmentDetail.actual_datetime) : null
    const suggestion_datetime = appointmentDetail.suggestion_datetime ? new Date(appointmentDetail.suggestion_datetime) : null

    function onSubmitAcceptAppointment(data) {
        acceptAppointment(appointmentDetail, data)
    }

    function onSubmitRejectAppointment(data) {
        rejectAppointment(appointmentDetail, data)
    }

    if (appointmentsLoading) {
        return <p>cargando...</p>
    }

    return (
        <>
            <div>
                <p>Mascota: {appointmentDetail.pet_name}</p>
                <p>Motivo: {appointmentDetail.reason}</p>
                <p>Fecha solicitada: {getDateMonthYear(request_date)}</p>
                <p>Franja horaria solicitada: {appointmentDetail.request_timeslot}</p>
                <p>Fecha fijada: {getDateMonthYear(actual_datetime)}</p>
                <p>Hora fijada: {getHoursAndMinutes(actual_datetime)}</p>
                <p>Fecha sugerida: {getDateMonthYear(suggestion_datetime)}</p>
                <p>Hora sugerida: {getHoursAndMinutes(suggestion_datetime)}</p>
                <p>Estado: {appointmentDetail.status}</p>
            </div>
            
            { appointmentDetail.status == 'PEN'
                ? <div className="row">
                    <div className="column"><AppointmentAcceptForm onSubmit={ onSubmitAcceptAppointment } errors={ acceptAppointmentError }/></div>

                    <div className="column"><AppointmentRejectForm onSubmit={ onSubmitRejectAppointment } errors={ rejectAppointmentError }/></div>
                </div>
                : null
            }
        </>
    )
}

export default AppointmentDetailAdminPage