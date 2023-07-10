import { Today } from "../../utils/datetime";

export default function ContactForm({ onSubmit, errors }) {
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

        <label htmlFor="nameField">Titulo</label>
        <input type="text" name="name" id="nameField" />
        {errors.name ? <p style={{ color: "red" }}>{errors.name[0]}</p> : null}

        <label htmlFor="descriptionField">Descripcion</label>
        <textarea name="description" id="descriptionField" />
        {errors.description ? (
          <p style={{ color: "red" }}>{errors.description[0]}</p>
        ) : null}

        <label htmlFor="endDateField">Fecha de fin</label>
        <input
          type="date"
          name="end_date"
          id="endDateField"
          min={Today().toISOString().split("T")[0]}
        />
        {errors.end_date ? (
          <p style={{ color: "red" }}>{errors.end_date[0]}</p>
        ) : null}

        <label htmlFor="goalAmountField">Monto a recaudar</label>
        <input
          type="number"
          name="goal_amount"
          step=".01"
          id="goalAmountField"
        />
        {errors.goal_amount ? (
          <p style={{ color: "red" }}>{errors.goal_amount[0]}</p>
        ) : null}

        <input
          className="button-primary container"
          type="submit"
          value="Publicar"
        />
      </fieldset>
    </form>
  );
}
