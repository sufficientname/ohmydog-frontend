import { Link } from "react-router-dom";

function AppointmentTableRow({ appointment }) {
  return (
    <tr>
      <td>
        <Link to={`/pets/${appointment.pet_id}`}>{appointment.pet_name}</Link>
      </td>
      <td>{appointment.reason}</td>
      <td>{appointment.date}</td>
      <td>{appointment.hour || appointment.timeslot}</td>
      <td>{appointment.status}</td>
      <td>
        <Link to={`/appointments/${appointment.id}`}>Ver detalle</Link>
      </td>
    </tr>
  );
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
        {appointments.map((appointment) => (
          <AppointmentTableRow appointment={appointment} key={appointment.id} />
        ))}
      </tbody>
    </table>
  );
}
