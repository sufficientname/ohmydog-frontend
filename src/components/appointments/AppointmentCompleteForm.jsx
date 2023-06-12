export default function AppointmentCompleteForm({
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

        <label htmlFor="observationsField">Observaciones</label>
        <textarea name="observations" id="observationsField" />
        {errors.observations ? (
          <p style={{ color: "red" }}>{errors.observations[0]}</p>
        ) : null}

        <label htmlFor="priceField">Precio</label>
        <input type="number" name="price" step=".01" min="0" id="priceField" />
        {errors.price ? (
          <p style={{ color: "red" }}>{errors.price[0]}</p>
        ) : null}

        <input
          className="button-primary"
          type="submit"
          value="Completar turno"
          disabled={!appointment.can_complete}
        />
      </fieldset>
    </form>
  );
}
