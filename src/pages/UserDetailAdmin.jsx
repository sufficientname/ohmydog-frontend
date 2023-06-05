import { useContext, useEffect } from "react";
import UsersAdminContext from "../contexts/UsersAdminContext";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

export default function UserDetailAdminPage() {
  const params = useParams();
  const { usersLoading, retrieveUser, userDetail } =
    useContext(UsersAdminContext);

  useEffect(() => {
    retrieveUser(params.userId);
  }, []);

  return (
    <Loader loading={usersLoading}>
      <div>
        <p>DNI: {userDetail.id_number}</p>
        <p>Nombre: {userDetail.first_name}</p>
        <p>Apellido: {userDetail.last_name}</p>
        <p>Email: {userDetail.email}</p>
        <p>Telefono: {userDetail.phone_number}</p>
        <p>Fecha de nacimiento: {userDetail.birthdate}</p>
      </div>
    </Loader>
  );
}
