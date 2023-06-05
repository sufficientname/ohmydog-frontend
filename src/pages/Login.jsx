import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import LoginForm from "../components/auth/loginForm";

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

  function onSubmit(data) {
    login(data, onSuccess);
  }

  return (
    <>
      <LoginForm onSubmit={onSubmit} errors={loginError} />
    </>
  );
}
