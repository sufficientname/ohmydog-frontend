import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table";
import PetSearchesAdminContext from "../../contexts/PetSearchesAdminContext";

export default function PetSearchListAdminPage() {
  const { petSearchesLoading, listPetSearches, petSearchList } = useContext(
    PetSearchesAdminContext
  );

  const [step, setStep] = useState(0);

  useEffect(() => {
    listPetSearches({ status: "PUB" });
  }, []);

  function onClickPublishedPetSearches(event) {
    setStep(0);
    listPetSearches({ status: "PUB" });
  }

  function onClickCompletedPetSearches(event) {
    setStep(1);
    listPetSearches({ status: "COM" });
  }

  function onClickAllPetSearches(event) {
    setStep(2);
    listPetSearches();
  }

  return (
    <>
      <h1>Anuncios de busqueda</h1>

      <hr></hr>

      <div className="row">
        <div className="column">
          <button
            className="button container"
            onClick={onClickPublishedPetSearches}
          >
            Publicados
          </button>
        </div>

        <div className="column">
          <button
            className="button container"
            onClick={onClickCompletedPetSearches}
          >
            Encontrados
          </button>
        </div>

        <div className="column">
          <button className="button container" onClick={onClickAllPetSearches}>
            Todos
          </button>
        </div>
      </div>

      <Table
        headers={[
          { key: "pet_name", label: "Nombre" },
          { key: "pet_age", label: "Edad" },
          { key: "pet_gender", label: "Sexo" },
          { key: "pet_breed", label: "Raza" },
          { key: "pet_size", label: "Tamaño" },
          { key: "pet_color", label: "Color" },
          { key: "last_seen_area", label: "Zona" },
          { key: "status", label: "Estado" },
          {
            key: "created_at",
            label: "Fecha publicacion",
            wrapper: (value, petSearch) => value.split("T")[0],
          },
          {
            wrapper: (value, petSearch) => (
              <Link to={`/admin/petsearches/${petSearch.id}`}>Ver detalle</Link>
            ),
          },
        ]}
        data={petSearchList}
        loading={petSearchesLoading}
      />
    </>
  );
}
