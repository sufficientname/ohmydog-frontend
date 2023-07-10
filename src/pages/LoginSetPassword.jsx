import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SetPasswordForm from "../components/auth/SetPasswordForm";
import AuthContext from "../contexts/AuthContext";

export default function LoginSetPasswordPage() {
  const navigate = useNavigate();

  const { setPassword, loginError } = useContext(AuthContext);

  function onSuccess(data) {
    navigate(`/home`);
  }

  function onSubmitSetPassword(data) {
    setPassword(data, onSuccess);
  }

  return (
    <>
      <h1>Cambiar contraseña</h1>

      <hr></hr>

      <SetPasswordForm onSubmit={onSubmitSetPassword} errors={loginError} />
    </>
  );
}
