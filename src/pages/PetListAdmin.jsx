import { useContext, useEffect } from "react";
import PetsAdminContext from "../contexts/PetsAdminContext";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/loader";
import Table from "../components/table";

export default function PetListPage() {
  const navigate = useNavigate();

  const { petsLoading, listPets, petList } = useContext(PetsAdminContext);

  useEffect(() => {
    listPets();
  }, []);

  function onClick(event) {
    navigate("/admin/pets/create");
  }

  return (
    <Loader loading={petsLoading}>
      <div className="float-right">
        <button className="button" onClick={onClick} disabled>
          Agregar mascota
        </button>
      </div>

      <Table
        headers={[
          { key: "user_fullname", name: "Cliente" },
          { key: "name", name: "Nombre" },
          { key: "breed", name: "Raza" },
          { key: "color", name: "Color" },
          { key: "birthdate", name: "Fecha de nacimiento" },
          { wrapper: seeDetailWrapper },
        ]}
        data={petList}
      />
    </Loader>
  );
}

function seeDetailWrapper(value, pet) {
  return <Link to={`/admin/pets/${pet.id}`}>Ver detalle</Link>;
}
