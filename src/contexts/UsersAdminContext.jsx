import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000";

const UsersContext = createContext({
  usersLoading: true,
  userDetail: {},
  retrieveUser: () => {},
  createUser: () => {},
  createUserError: {},
});

export const UsersContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState({});
  const [createUserError, setCreateUserError] = useState({});

  const retrieveUserHandler = async (userId) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/admin-api/users/${userId}/`, getBasicAuth())
      .then((res) => {
        setUserDetail(res.data);
      })
      .catch((err) => {
        setUserDetail({});
        console.log("error retrieving user", err.response);
      });
    setIsLoading(false);
  };

  const createUserHandler = async (userData) => {
    await axios
      .post(`${baseUrl}/admin-api/users/${userData}`, {}, getBasicAuth())
      .then((res) => {
        setUserDetail(res.data);
        setCreateUserError({});
      })
      .catch((err) => {
        setUserDetail({});
        createUserError(err.response);
        console.log("error creating user", err.response);
      });
  };

  return (
    <UsersContext.Provider
      value={{
        usersLoading: isLoading,
        userDetail: userDetail,
        retrieveUser: retrieveUserHandler,
        createUser: createUserHandler,
        createUserError: createUserError,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
