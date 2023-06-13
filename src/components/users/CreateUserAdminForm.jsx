export default function CreateUserAdminForm({ onSubmit, errors }) {
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

        <label htmlFor="firstnameField">Nombre</label>
        <input type="text" name="first_name" id="firstnameField" />
        {errors.first_name ? (
          <p style={{ color: "red" }}>{errors.first_name[0]}</p>
        ) : null}

        <label htmlFor="lastnameField">Apellido</label>
        <input type="text" name="last_name" id="lastnameField" />
        {errors.last_name ? (
          <p style={{ color: "red" }}>{errors.last_name[0]}</p>
        ) : null}

        <label htmlFor="idNumberField">DNI</label>
        <input type="text" name="id_number" id="idNumberField" />
        {errors.id_number ? (
          <p style={{ color: "red" }}>{errors.id_number[0]}</p>
        ) : null}

        <label htmlFor="birthdateField">Fecha de nacimiento</label>
        <input type="date" name="birthdate" id="birthdateField" />
        {errors.birthdate ? (
          <p style={{ color: "red" }}>{errors.birthdate[0]}</p>
        ) : null}

        <label htmlFor="emailField">Email</label>
        <input type="text" name="email" id="emailField" />
        {errors.email ? (
          <p style={{ color: "red" }}>{errors.email[0]}</p>
        ) : null}

        <label htmlFor="phoneNumberField">Telefono</label>
        <input type="tel" name="phone_number" id="phoneNumberField" />
        {errors.phone_number ? (
          <p style={{ color: "red" }}>{errors.phone_number[0]}</p>
        ) : null}

        <input className="button-primary" type="submit" value="Agregar" />
      </fieldset>
    </form>
  );
}
