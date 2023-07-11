import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../components/loader";
import Table from "../../components/table";
import PetsAdminContext from "../../contexts/PetsAdminContext";

export default function PetListPage() {
  const navigate = useNavigate();

  const { petsLoading, listPets, petList } = useContext(PetsAdminContext);

  useEffect(() => {
    listPets();
  }, []);

  function onClickCreatePet(event) {
    navigate("/admin/pets/create");
  }

  return (
    <>
      <h1>Mascotas</h1>

      <div className="row">
        <div className="column"></div>
        <div className="column"></div>

        <div className="column">
          <button
            className="button container"
            onClick={onClickCreatePet}
            disabled
          >
            Agregar mascota
          </button>
        </div>
      </div>

      <hr></hr>

      <Table
        headers={[
          { key: "user_full_name", label: "Cliente" },
          { key: "name", label: "Nombre" },
          { key: "breed", label: "Raza" },
          { key: "color", label: "Color" },
          { key: "gender", label: "Sexo" },
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
    </>
  );
}
