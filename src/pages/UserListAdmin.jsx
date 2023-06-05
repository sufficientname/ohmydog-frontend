import { useContext, useEffect } from "react";
import UsersAdminContext from "../contexts/UsersAdminContext";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/loader";
import Table from "../components/table";

export default function UserListAdminPage() {
  const navigate = useNavigate();

  const { usersLoading, listUsers, userList } = useContext(UsersAdminContext);

  useEffect(() => {
    listUsers();
  }, []);

  function onClick(event) {
    navigate("/admin/users/create");
  }

  return (
    <Loader loading={usersLoading}>
      <div className="float-right">
        <button className="button" onClick={onClick}>
          Agregar cliente
        </button>
      </div>

      <Table
        headers={[
          { key: "id_number", name: "DNI" },
          { key: "first_name", name: "Nombre" },
          { key: "last_name", name: "Apellido" },
          { key: "email", name: "Email" },
          { key: "phone_number", name: "Telefono" },
          { key: "birthdate", name: "Fecha de nacimiento" },
          { wrapper: seeDetailWrapper },
        ]}
        data={userList}
      />
    </Loader>
  );
}

function seeDetailWrapper(value, user) {
  return <Link to={`/admin/users/${user.id}`}>Ver detalle</Link>;
}
