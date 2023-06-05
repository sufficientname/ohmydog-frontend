import { useContext } from "react";
import UsersContext from "../contexts/AuthContext";

function LoginForm({ loginError, onSubmit }) {
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
        {loginError.detail ? (
          <p style={{ color: "red" }}>{loginError.detail}</p>
        ) : null}

        <label htmlFor="passwordField">Contraseña</label>
        <input type="password" name="password" id="passwordField" />
        {loginError.detail ? (
          <p style={{ color: "red" }}>{loginError.detail}</p>
        ) : null}

        <input
          className="button-primary"
          type="submit"
          value="Iniciar sesion"
        />
      </fieldset>
    </form>
  );
}

export default function LoginPage() {
  const { userDetail, login, loginError } = useContext(UsersContext);

  return (
    <>
      <LoginForm loginError={loginError} onSubmit={login} />
    </>
  );
}
