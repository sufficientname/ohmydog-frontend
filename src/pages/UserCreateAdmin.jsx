import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UsersAdminContext from "../contexts/UsersAdminContext";
import CreateUserForm from "../components/users/CreateUserForm";

export default function AppointmentCreatePage({}) {
  const { createUser, createUserError } = useContext(UsersAdminContext);
  const navigate = useNavigate();

  function onCreate(data) {
    navigate(`/admin/users/${data.id}`);
  }

  function onSubmit(data) {
    createUser(data, onCreate);
  }

  return (
    <>
      <CreateUserForm onSubmit={onSubmit} errors={createUserError} />
    </>
  );
}
