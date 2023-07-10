export default function LoginForm({ onSubmit, errors }) {
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
        <label htmlFor="usernameField">Email</label>
        <input type="text" name="username" id="usernameField" />
        {errors.detail ? <p style={{ color: "red" }}>{errors.detail}</p> : null}

        <label htmlFor="passwordField">Contraseña</label>
        <input type="password" name="password" id="passwordField" />
        {errors.detail ? <p style={{ color: "red" }}>{errors.detail}</p> : null}

        <input
          className="button-primary container"
          type="submit"
          value="Iniciar sesion"
        />
      </fieldset>
    </form>
  );
}
