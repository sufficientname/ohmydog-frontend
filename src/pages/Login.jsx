import { useContext } from "react";
import UsersContext from "../contexts/AuthContext";
import LoginForm from "../components/auth/loginForm";

export default function LoginPage() {
  const { login, loginError } = useContext(UsersContext);

  return (
    <>
      <LoginForm onSubmit={login} errors={loginError} />
    </>
  );
}
