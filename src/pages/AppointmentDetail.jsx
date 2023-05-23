import { useContext, useEffect, useState } from 'react'
import AppointmentsContext from '../contexts/AppointmentsContext'
import { useParams } from 'react-router-dom';
import { getDateMonthYear, getHoursAndMinutes } from '../utils/datetime'
import { canCancelAppointment } from '../utils/appointments';


function AppointmentDetailPage() {
    const params = useParams()
    const { appointmentsLoading, retrieveAppointment, appointmentDetail, cancelAppointment } = useContext(AppointmentsContext)

    useEffect(() => {
        retrieveAppointment(params.appointmentId)
    }, [])

    const request_date = new Date(appointmentDetail.request_date)
    const actual_datetime = new Date(appointmentDetail.actual_datetime)
    const suggestion_datetime = new Date(appointmentDetail.suggestion_datetime)

    function OnClickCancelAppointment() {
        cancelAppointment(appointmentDetail)
    }

    if (appointmentsLoading) {
        return <p>cargando...</p>
    }

    return (
        <>
            {
                canCancelAppointment(appointmentDetail)
                ? <div className='float-right'>
                    <button className='button' onClick={ OnClickCancelAppointment }>Cancelar turno</button>
                </div>
                : null
            }

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
        </>
    )
}

export default AppointmentDetailPage