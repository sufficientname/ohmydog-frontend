export default function AppointmentAcceptForm({
  appointment,
  onSubmit,
  errors,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    console.log("submitting", values);

    onSubmit(values);
  };
  
  console.log(appointment)

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        {errors.non_field_errors ? (
          <p style={{ color: "red" }}>{errors.non_field_errors[0]}</p>
        ) : null}

        <label htmlFor="hourField">Hora</label>
        <input type="time" name="hour" id="hourField" />
        <br></br>
        {errors.hour ? <p style={{ color: "red" }}>{errors.hour[0]}</p> : null}

        <input
          className="button-primary"
          type="submit"
          value="Aceptar turno"
          disabled={!appointment.can_accept}
        />
      </fieldset>
    </form>
  );
}
