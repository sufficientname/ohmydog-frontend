import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/loginForm";
import AuthContext from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login, loginError } = useContext(AuthContext);

  function onSuccess(data) {
    if (!data.is_staff && !data.password_set) {
      navigate(`/login/set-password`);
      return;
    }

    navigate(`/home`);
  }

  function onSubmitLogin(data) {
    login(data, onSuccess);
  }

  return (
    <>
      <h1>Iniciar sesion</h1>

      <hr></hr>

      <LoginForm onSubmit={onSubmitLogin} errors={loginError} />
    </>
  );
}
