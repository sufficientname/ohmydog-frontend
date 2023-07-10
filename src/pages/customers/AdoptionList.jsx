import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Table from "../../components/table";
import AdoptionsContext from "../../contexts/AdoptionsContext";
import AuthContext from "../../contexts/AuthContext";

export default function AdoptionListPage() {
  const { adoptionsLoading, listAdoptions, adoptionList } =
    useContext(AdoptionsContext);
  const { userDetail } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  useEffect(() => {
    listAdoptions({ status: "PUB" });
  }, []);

  function onClickCreateAdoption(event) {
    navigate("/adoptions/create");
  }

  function onClickPublishedAdoptions(event) {
    setStep(0);
    listAdoptions({ status: "PUB" });
  }

  function onClickCompletedAdoptions(event) {
    setStep(1);
    listAdoptions({ status: "COM" });
  }

  function onClickMyAdoptions(event) {
    setStep(2);
    listAdoptions({ user: userDetail.id });
  }

  return (
    <>
      <h1>Anuncios de adopcion</h1>

      <div className="row">
        <div className="column"></div>
        <div className="column"></div>

        <div className="column">
          <button className="button container" onClick={onClickCreateAdoption}>
            Publicar anuncio
          </button>
        </div>
      </div>

      <hr></hr>

      <div className="row">
        <div className="column">
          <button
            className="button container"
            onClick={onClickPublishedAdoptions}
          >
            Publicados
          </button>
        </div>

        <div className="column">
          <button
            className="button container"
            onClick={onClickCompletedAdoptions}
          >
            Adoptados
          </button>
        </div>

        <div className="column">
          <button className="button container" onClick={onClickMyAdoptions}>
            Mis Anuncios
          </button>
        </div>
      </div>

      <Table
        headers={[
          { key: "pet_name", label: "Nombre" },
          { key: "pet_age", label: "Edad" },
          { key: "pet_size", label: "Tamaño" },
          { key: "pet_gender", label: "Sexo" },
          { key: "status", label: "Estado" },
          {
            key: "created_at",
            label: "Fecha publicacion",
            wrapper: (value, adoption) => value.split("T")[0],
          },
          {
            wrapper: (value, adoption) => (
              <Link to={`/adoptions/${adoption.id}`}>Ver detalle</Link>
            ),
          },
        ]}
        data={adoptionList}
        loading={adoptionsLoading}
      />
    </>
  );
}
