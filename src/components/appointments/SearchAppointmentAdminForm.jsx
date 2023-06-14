import { statuses } from "./constants";

export default function SearchAppointmentAdminForm({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      Object.entries(Object.fromEntries(data.entries())).filter(
        ([_, v]) => v != ""
      )
    );

    console.log("submitting", values);

    onSubmit(values);
  };

  const statusChoices = [{ id: "", name: " " }, ...statuses];

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="row">
          <div className="column">
            <label htmlFor="statusField">Estado</label>
            <select name="status" id="statusField">
              {statusChoices.map((status, i) => (
                <option value={status.id} key={i}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className="column">
            <label htmlFor="dateAfterField">Desde</label>
            <input type="date" name="date_after" id="dateAfterField" />
          </div>

          <div className="column">
            <label htmlFor="dateBeforeField">Hasta</label>
            <input type="date" name="date_before" id="dateBeforeField" />
          </div>

          <div className="column">
            <input className="button" type="submit" value="Buscar" />
          </div>
        </div>
      </fieldset>
    </form>
  );
}
