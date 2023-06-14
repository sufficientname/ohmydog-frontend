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

  function onSubmitSearch(data) {
    listUsers(data);
  }

  return (
    <>
      <h1>Clientes</h1>

      <div className="row">
        <div className="column"></div>
        <div className="column"></div>

        <div className="column">
          <button className="button container" onClick={onClick}>
            Agregar cliente
          </button>
        </div>
      </div>

      <hr></hr>

      <SearchUserAdminForm onSubmit={onSubmitSearch} />

      {/* <Loader loading={usersLoading}> */}
      <Table
        headers={[
          { key: "id_number", label: "DNI" },
          { key: "first_name", label: "Nombre" },
          { key: "last_name", label: "Apellido" },
          { key: "email", label: "Email" },
          { key: "phone_number", label: "Telefono" },
          { key: "birthdate", label: "Fecha de nacimiento" },
          {
            wrapper: (value, user) => (
              <Link to={`/admin/users/${user.id}`}>Ver detalle</Link>
            ),
          },
        ]}
        data={userList}
        loading={usersLoading}
      />
    </>
  );
}
