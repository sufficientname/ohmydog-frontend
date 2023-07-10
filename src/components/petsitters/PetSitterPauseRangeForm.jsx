import { Today } from "../../utils/datetime";

export default function PetSitterPauseRangeForm({ onSubmit, errors }) {
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

        <label htmlFor="pauseStartDateField">Inicio de pausa</label>
        <input
          type="date"
          name="pause_start_date"
          id="pauseStartDateField"
          min={Today().toISOString().split("T")[0]}
        />
        {errors.pause_start_date ? (
          <p style={{ color: "red" }}>{errors.pause_start_date[0]}</p>
        ) : null}

        <label htmlFor="pauseEndDateField">Fin de pausa</label>
        <input
          type="date"
          name="pause_end_date"
          id="pauseEndDateField"
          min={Today().toISOString().split("T")[0]}
        />
        {errors.pause_end_date ? (
          <p style={{ color: "red" }}>{errors.pause_end_date[0]}</p>
        ) : null}

        <input
          className="button-primary container"
          type="submit"
          value="Pausar"
        />
      </fieldset>
    </form>
  );
}
