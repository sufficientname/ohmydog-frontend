import { Today } from "../../utils/datetime";
import { reasons, timeslots } from "./constants";

export default function AppointmentRequestForm({ onSubmit, errors, pets }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    console.log("submitting", values);

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        {errors.non_field_errors ? (
          <p style={{ color: "red" }}>{errors.non_field_errors[0]}</p>
        ) : null}

        <label htmlFor="petField">Mascota</label>
        <select name="pet" id="petField">
          {pets.map((pet, i) => (
            <option value={pet.id} key={i}>
              {pet.name}
            </option>
          ))}
        </select>
        {errors.pet ? <p style={{ color: "red" }}>{errors.pet[0]}</p> : null}

        <label htmlFor="reasonField">Motivo</label>
        <select name="reason" id="reasonField">
          {reasons.map((reason, i) => (
            <option value={reason.id} key={i}>
              {reason.name}
            </option>
          ))}
        </select>
        {errors.reason ? (
          <p style={{ color: "red" }}>{errors.reason[0]}</p>
        ) : null}

        <label htmlFor="dateField">Fecha</label>
        <input
          type="date"
          name="date"
          id="dateField"
          min={Today().toISOString().split("T")[0]}
        />
        {errors.date ? <p style={{ color: "red" }}>{errors.date[0]}</p> : null}

        <label htmlFor="timeslotField">Franja horaria</label>
        <select name="timeslot" id="timeslotField">
          {timeslots.map((timeslot, i) => (
            <option value={timeslot.id} key={i}>
              {timeslot.name}
            </option>
          ))}
        </select>
        {errors.timeslot ? (
          <p style={{ color: "red" }}>{errors.timeslot[0]}</p>
        ) : null}

        <input className="button-primary" type="submit" value="Solicitar" />
      </fieldset>
    </form>
  );
}
