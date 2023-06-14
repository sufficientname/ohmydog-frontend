import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../../components/loader";
import Table from "../../components/table";
import UsersAdminContext from "../../contexts/UsersAdminContext";
import PetsAdminContext from "../../contexts/PetsAdminContext";

export default function UserDetailAdminPage() {
  const params = useParams();
  const { usersLoading, retrieveUser, userDetail } =
    useContext(UsersAdminContext);

  const { petsLoading, petList, listPets } = useContext(PetsAdminContext);

  useEffect(() => {
    retrieveUser(params.userId);
    listPets({ user: params.userId });
  }, []);

  return (
    <>
      <h1>Cliente</h1>

      <hr></hr>

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

      <hr></hr>

      <h2>Mascotas</h2>
      <Loader loading={petsLoading}>
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
        />
      </Loader>
    </>
  );
}
