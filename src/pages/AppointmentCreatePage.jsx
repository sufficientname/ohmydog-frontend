import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentsContext from "../contexts/AppointmentsContext";
import PetsContext from "../contexts/PetsContext";

const reasons = [
  { id: "CONSULTA_GENERAL", name: "Consulta general" },
  { id: "VACUNACION_A", name: "Vacunacion A" },
  { id: "VACUNACION_B", name: "Vacunacion B" },
  { id: "DESPARASITACION", name: "Desparasitacion" },
  { id: "CASTRACION", name: "Castracion" },
  { id: "URGENCIA", name: "Urgencia" },
];

const timeslots = [
  { id: "MANANA", name: "Mañana" },
  { id: "TARDE", name: "Tarde" },
];

export default function AppointmentCreatePage({}) {
  const { createAppointment, createAppointmentError } =
    useContext(AppointmentsContext);
  const { petList } = useContext(PetsContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    console.log("submitting", values);

    createAppointment(values).then((res) => {
      navigate("/appointments");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        {createAppointmentError.non_field_errors ? (
          <p style={{ color: "red" }}>
            {createAppointmentError.non_field_errors[0]}
          </p>
        ) : null}

        <label htmlFor="petField">Mascota</label>
        <select name="pet" id="petField">
          {petList.map((pet) => (
            <option value={pet.id} key={pet.id}>
              {pet.name}
            </option>
          ))}
        </select>
        {createAppointmentError.pet ? (
          <p style={{ color: "red" }}>{createAppointmentError.pet[0]}</p>
        ) : null}

        <label htmlFor="reasonField">Motivo</label>
        <select name="reason" id="reasonField">
          {reasons.map((reason) => (
            <option value={reason.id} key={reason.id}>
              {reason.name}
            </option>
          ))}
        </select>
        {createAppointmentError.reason ? (
          <p style={{ color: "red" }}>{createAppointmentError.reason[0]}</p>
        ) : null}

        <label htmlFor="requestDateField">Fecha</label>
        <input
          type="date"
          name="request_date"
          id="requestDateField"
          min={new Date().toISOString().split("T")[0]}
        />
        {createAppointmentError.request_date ? (
          <p style={{ color: "red" }}>
            {createAppointmentError.request_date[0]}
          </p>
        ) : null}

        <label htmlFor="requestTimeslotField">Franja horaria</label>
        <select name="request_timeslot" id="requestTimeslotField">
          {timeslots.map((timeslot) => (
            <option value={timeslot.id} key={timeslot.id}>
              {timeslot.name}
            </option>
          ))}
        </select>
        {createAppointmentError.request_timeslot ? (
          <p style={{ color: "red" }}>
            {createAppointmentError.request_timeslot[0]}
          </p>
        ) : null}

        <input className="button-primary" type="submit" value="Solicitar" />
      </fieldset>
    </form>
  );
}
