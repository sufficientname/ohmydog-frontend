import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table";
import AdoptionsAdminContext from "../../contexts/AdoptionsAdminContext";

export default function AdoptionListAdmin() {
  const { adoptionsLoading, listAdoptions, adoptionList } = useContext(
    AdoptionsAdminContext
  );

  const [step, setStep] = useState(0);

  useEffect(() => {
    listAdoptions({ status: "PUB" });
  }, []);

  const onClickPublishedAdoption = (e) => {
    setStep(0);
    listAdoptions({ status: "PUB" });
  };

  const onClickAdoptedAdoption = (e) => {
    setStep(1);
    listAdoptions({ status: "COM" });
  };

  const onClickAllAdoptions = (e) => {
    setStep(2);
    listAdoptions();
  };

  return (
    <>
      <h1>Anuncios de adopcion</h1>

      <hr></hr>

      <div className="row">
        <div className="column">
          <button
            className="button container"
            onClick={onClickPublishedAdoption}
          >
            Publicados
          </button>
        </div>

        <div className="column">
          <button className="button container" onClick={onClickAdoptedAdoption}>
            Adoptados
          </button>
        </div>

        <div className="column">
          <button className="button container" onClick={onClickAllAdoptions}>
            Todos
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
            key: "date_created",
            label: "Fecha publicacion",
            wrapper: (value, adoption) => value.split("T")[0],
          },
          {
            wrapper: (value, adoption) => (
              <Link to={`/admin/adoptions/${adoption.id}`}>Ver detalle</Link>
            ),
          },
        ]}
        data={adoptionList}
        loading={adoptionsLoading}
      />
    </>
  );
}
