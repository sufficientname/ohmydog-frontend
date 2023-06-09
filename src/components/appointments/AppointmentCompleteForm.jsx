export default function AppointmentCompleteForm({
  appointment,
  onSubmit,
  errors,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());
    if (!values.update_health_record) {
      values.update_health_record = false;
    } else {
      values.update_health_record = true;
    }

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
        <input type="number" name="price" step=".01" id="priceField" />
        {errors.price ? (
          <p style={{ color: "red" }}>{errors.price[0]}</p>
        ) : null}

        <label htmlFor="weightField">Peso</label>
        <input type="number" name="weight" step=".01" id="weightField" />
        {errors.price ? (
          <p style={{ color: "red" }}>{errors.weight[0]}</p>
        ) : null}

        <input
          type="checkbox"
          name="update_health_record"
          id="updateHealthRecordField"
          defaultChecked={true}
        />
        <label className="label-inline" htmlFor="updateHealthRecordField">
          Actualizar libreta sanitaria?
        </label>

        <br></br>

        {appointment.user_discount_amount ? (
          <p>Se aplicara un descuento de ${appointment.user_discount_amount}</p>
        ) : (
          <p>Este cliente no tiene descuentos disponibles</p>
        )}

        <input
          className="button-primary container"
          type="submit"
          value="Completar turno"
        />
      </fieldset>
    </form>
  );
}
