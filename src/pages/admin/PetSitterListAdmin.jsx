import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Table from "../../components/table";
import PetSittersAdminContext from "../../contexts/PetSittersAdminContext";

export default function PetSitterListAdminPage() {
  const navigate = useNavigate();

  const { petSittersLoading, listPetSitters, petSitterList } = useContext(
    PetSittersAdminContext
  );

  const [step, setStep] = useState(0);

  useEffect(() => {
    listPetSitters({ status: "PUB" });
  }, []);

  function onClickCreatePetSitter(event) {
    navigate("/admin/petsitters/create");
  }

  function onClickPublishedPetSitters(event) {
    setStep(0);
    listPetSitters({ status: "PUB" });
  }

  function onClickCompletedPetSitters(event) {
    setStep(1);
    listPetSitters({ status: "COM" });
  }

  function onClickAllPetSitters(event) {
    setStep(2);
    listPetSitters();
  }

  return (
    <>
      <h1>Anuncios de paseadores y cuidadores</h1>

      <div className="row">
        <div className="column"></div>
        <div className="column"></div>

        <div className="column">
          <button className="button container" onClick={onClickCreatePetSitter}>
            Publicar anuncio
          </button>
        </div>
      </div>

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
            onClick={onClickCompletedPetSitters}
          >
            Encontrados
          </button>
        </div>

        <div className="column">
          <button className="button container" onClick={onClickAllPetSitters}>
            Todos
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
              <Link to={`/admin/petsitters/${petSitter.id}`}>Ver detalle</Link>
            ),
          },
        ]}
        data={petSitterList}
        loading={petSittersLoading}
      />
    </>
  );
}
