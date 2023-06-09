import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000/admin-api";

const UsersContext = createContext({
  usersLoading: true,
  userList: [],
  userDetail: {},
  listUsers: () => {},
  retrieveUser: () => {},
  createUser: () => {},
  createUserError: {},
});

export const UsersContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [createUserError, setCreateUserError] = useState({});

  const listUsersHandler = async (params = {}) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/users/`, { auth: getBasicAuth(), params: params })
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        setUserList([]);
        console.log("error listing users", err.response);
      });
    setIsLoading(false);
  };

  const retrieveUserHandler = async (userId) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/users/${userId}/`, { auth: getBasicAuth() })
      .then((res) => {
        setUserDetail(res.data);
      })
      .catch((err) => {
        setUserDetail({});
        console.log("error retrieving user", err.response);
      });
    setIsLoading(false);
  };

  const createUserHandler = async (userData, onCreate) => {
    await axios
      .post(`${baseUrl}/users/`, userData, { auth: getBasicAuth() })
      .then((res) => {
        setUserDetail(res.data);
        setCreateUserError({});
        onCreate(res.data);
      })
      .catch((err) => {
        setUserDetail({});
        setCreateUserError(err.response.data);
        console.log("error creating user", err.response);
      });
  };

  return (
    <UsersContext.Provider
      value={{
        usersLoading: isLoading,
        userList: userList,
        userDetail: userDetail,
        listUsers: listUsersHandler,
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
