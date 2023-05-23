export function canCancelAppointment(appointment) {
    return (
        appointment.status == "PEN" ||
        appointment.status == "APR"
    )
}