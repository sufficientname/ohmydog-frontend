import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table";
import PetSittersContext from "../../contexts/PetSittersContext";

export default function PetSitterListPage() {
  const { petSittersLoading, listPetSitters, petSitterList } =
    useContext(PetSittersContext);

  const [step, setStep] = useState(0);

  useEffect(() => {
    listPetSitters({ status: "PUB" });
  }, []);

  function onClickPublishedPetSitters(event) {
    setStep(0);
    listPetSitters({ status: "PUB" });
  }

  function onClickPausedPetSitters(event) {
    setStep(1);
    listPetSitters({ status: "PAU" });
  }

  return (
    <>
      <h1>Anuncios de paseadores y cuidadores</h1>

      <hr></hr>

      <div className="row">
        <div className="column">
          <button
            className="button container"
            onClick={onClickPublishedPetSitters}
          >
            Publicados
          </button>
        </div>

        <div className="column">
          <button
            className="button container"
            onClick={onClickPausedPetSitters}
          >
            Pausados
          </button>
        </div>
      </div>

      <Table
        headers={[
          { key: "sitter_first_name", label: "Nombre" },
          { key: "sitter_last_name", label: "Apellido" },
          { key: "sitter_email", label: "Email" },
          { key: "sitter_phone_number", label: "Telefono" },
          { key: "service_type", label: "Servicio" },
          { key: "service_area", label: "Zona" },
          { key: "status", label: "Estado" },
          {
            key: "created_at",
            label: "Fecha publicacion",
            wrapper: (value, petSitter) => value.split("T")[0],
          },
          {
            wrapper: (value, petSitter) => (
              <Link to={`/petsitters/${petSitter.id}`}>Ver detalle</Link>
            ),
          },
        ]}
        data={petSitterList}
        loading={petSittersLoading}
      />
    </>
  );
}
