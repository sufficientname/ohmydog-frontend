import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../components/loader";
import Table from "../../components/table";
import PetsContext from "../../contexts/PetsContext";

export default function PetListPage() {
  const navigate = useNavigate();

  const { petsLoading, listPets, petList } = useContext(PetsContext);

  useEffect(() => {
    listPets();
  }, []);

  function onClick(event) {
    navigate("/pets/create");
  }

  return (
    <>
      <h1>Mascotas</h1>

      <div className="float-right">
        <button className="button" onClick={onClick}>
          Agregar mascota
        </button>
      </div>

      <Table
        headers={[
          { key: "name", label: "Nombre" },
          { key: "breed", label: "Raza" },
          { key: "color", label: "Color" },
          { key: "birthdate", label: "Fecha de nacimiento" },
          { wrapper: seeDetailWrapper },
        ]}
        data={petList}
        loading={petsLoading}
      />
    </>
  );
}

function seeDetailWrapper(value, pet) {
  return <Link to={`/pets/${pet.id}`}>Ver detalle</Link>;
}
