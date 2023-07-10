import { useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../../components/loader";
import Table from "../../components/table";
import UsersAdminContext from "../../contexts/UsersAdminContext";
import PetsAdminContext from "../../contexts/PetsAdminContext";

export default function UserDetailAdminPage() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    usersLoading,
    retrieveUser,
    userDetail,
    setUserIsActive,
    deactivateUser,
  } = useContext(UsersAdminContext);

  const { petsLoading, petList, listPets } = useContext(PetsAdminContext);

  useEffect(() => {
    retrieveUser(params.userId);
    listPets({ user: params.userId });
  }, []);

  function onClickReactivateUser(event) {
    setUserIsActive(userDetail, true);
  }

  function onClickDeactivateUser(event) {
    setUserIsActive(userDetail, false);
  }

  return (
    <>
      <h1>Cliente</h1>

      <Loader loading={usersLoading}>
        <div className="row">
          <div className="column"></div>
          <div className="column"></div>

          <div className="column">
            {userDetail.is_active ? (
              <button
                className="button container"
                onClick={onClickDeactivateUser}
              >
                Desactivar cliente
              </button>
            ) : (
              <button
                className="button container"
                onClick={onClickReactivateUser}
              >
                Reactivar cliente
              </button>
            )}
          </div>
        </div>

        <hr></hr>

        <div>
          <p>DNI: {userDetail.id_number}</p>
          <p>Nombre: {userDetail.first_name}</p>
          <p>Apellido: {userDetail.last_name}</p>
          <p>Email: {userDetail.email}</p>
          <p>Telefono: {userDetail.phone_number}</p>
          <p>Fecha de nacimiento: {userDetail.birthdate}</p>
        </div>

        <hr></hr>

        <h2>Mascotas</h2>
        <Table
          headers={[
            { key: "name", label: "Nombre" },
            { key: "breed", label: "Raza" },
            { key: "color", label: "Color" },
            { key: "birthdate", label: "Fecha de nacimiento" },
            {
              wrapper: (value, pet) => (
                <Link to={`/admin/pets/${pet.id}`}>Ver detalle</Link>
              ),
            },
          ]}
          data={petList}
          loading={petsLoading}
        />
      </Loader>
    </>
  );
}
