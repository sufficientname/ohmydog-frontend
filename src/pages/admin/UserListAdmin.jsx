import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../components/loader";
import Table from "../../components/table";
import UsersAdminContext from "../../contexts/UsersAdminContext";
import SearchUserAdminForm from "../../components/users/SearchUserAdminForm";

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
    <>
      <h1>Clientes</h1>

      <div className="row">
        <div className="column">
          <SearchUserAdminForm
            onSubmit={(data) => listUsers({ id_number: data.id_number })}
          />
        </div>

        <div className="column">
          <button className="button float-right" onClick={onClick}>
            Agregar cliente
          </button>
        </div>
      </div>

      {/* <Loader loading={usersLoading}> */}
      <Table
        headers={[
          { key: "id_number", label: "DNI" },
          { key: "first_name", label: "Nombre" },
          { key: "last_name", label: "Apellido" },
          { key: "email", label: "Email" },
          { key: "phone_number", label: "Telefono" },
          { key: "birthdate", label: "Fecha de nacimiento" },
          { wrapper: seeDetailWrapper },
        ]}
        data={userList}
        loading={usersLoading}
      />
      {/* </Loader> */}
    </>
  );
}

function seeDetailWrapper(value, user) {
  return <Link to={`/admin/users/${user.id}`}>Ver detalle</Link>;
}
