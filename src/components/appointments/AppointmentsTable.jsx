import { Link } from 'react-router-dom';
import { getDateMonthYear, getHoursAndMinutes } from '../../utils/datetime'

function AppointmentTableRow({ appointment }) {
  let date, time
  if (appointment.actual_datetime == null) {
    const request_date = new Date(appointment.request_date)
    date = getDateMonthYear(request_date)
    time = appointment.request_timeslot
  } else {
    const actual_datetime = new Date(appointment.actual_datetime)
    date = getDateMonthYear(actual_datetime)
    time = getHoursAndMinutes(actual_datetime)
  }

  return (
    <tr>
      <td><Link to={`/pets/${appointment.pet_id}`}>{appointment.pet_name}</Link></td>
      <td>{appointment.reason}</td>
      <td>{date}</td>
      <td>{time}</td>
      <td>{appointment.status}</td>
      <td><Link to={`/appointments/${appointment.id}`}>Ver detalle</Link></td>
    </tr>
  )
}

export default function AppointmentsTable({ appointments }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Mascota</th>
          <th>Motivo</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => <AppointmentTableRow appointment={appointment} key={appointment.id} />)}
      </tbody>
    </table>
  )
}
