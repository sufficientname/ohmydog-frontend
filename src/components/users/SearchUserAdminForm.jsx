export default function SearchUserAdminForm({ onSubmit }) {
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

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="row">
          <div className="column">
            <input
              type="text"
              name="id_number"
              placeholder="dni"
              id="idNumberSearchField"
            />
          </div>

          <div className="column">
            <input className="button" type="submit" value="Buscar" />
          </div>
        </div>
      </fieldset>
    </form>
  );
}
