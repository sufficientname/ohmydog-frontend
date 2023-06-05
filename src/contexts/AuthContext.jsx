import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth, setBasicAuth, removeBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000";

const AuthContext = createContext({
  usersLoading: true,
  userDetail: {},
  retrieveUser: () => {},
  login: () => {},
  logout: () => {},
  loginError: {},
});

export const AuthContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState({});
  const [loginError, setLoginError] = useState({});

  const retrieveUserHandler = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/users-api/users/me/`, getBasicAuth())
      .then((res) => {
        setUserDetail(res.data);
      })
      .catch((err) => {
        setUserDetail({});
        console.log("error retrieving user", err.response);
      });
    setIsLoading(false);
  };

  const loginHandler = async ({ username, password }) => {
    setIsLoading(true);
    const basicauth = { auth: { username: username, password: password } };
    await axios
      .get(`${baseUrl}/users-api/users/me/`, basicauth)
      .then((res) => {
        setBasicAuth(username, password);
        setUserDetail(res.data);
        setLoginError({});
      })
      .catch((err) => {
        removeBasicAuth();
        setUserDetail({});
        setLoginError({ detail: "email o contraseña incorrectas" });
        console.log("login error", err.response);
      });
    setIsLoading(false);
  };

  const logoutHandler = async () => {
    setIsLoading(true);
    removeBasicAuth();
    setUserDetail({});
    setIsLoading(false);
    setLoginError({});
  };

  return (
    <AuthContext.Provider
      value={{
        usersLoading: isLoading,
        userDetail: userDetail,
        retrieveUser: retrieveUserHandler,
        login: loginHandler,
        logout: logoutHandler,
        loginError: loginError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
