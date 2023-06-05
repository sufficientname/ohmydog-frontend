export default function AppointmentRejectForm({
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

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        {errors.non_field_errors ? (
          <p style={{ color: "red" }}>{errors.non_field_errors[0]}</p>
        ) : null}

        <label htmlFor="suggestionDateField">Fecha sugerida</label>
        <input
          type="date"
          name="suggestion_date"
          id="suggestionDateField"
          min={new Date().toISOString()}
        />
        {errors.suggestion_date ? (
          <p style={{ color: "red" }}>{errors.suggestion_date[0]}</p>
        ) : null}

        <input
          className="button-primary"
          type="submit"
          value="Rechazar turno"
          disabled={!appointment.can_accept}
        />
      </fieldset>
    </form>
  );
}
