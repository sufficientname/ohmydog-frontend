import { useContext, useEffect } from "react";
import AdoptionsContext from "../contexts/AdoptionsContext";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/loader";
import Table from "../components/table";

export default function AdoptionListPage() {
  const { adoptionsLoading, listAdoptions, adoptionList } =
    useContext(AdoptionsContext);
  const navigate = useNavigate();

  useEffect(() => {
    listAdoptions();
  }, []);

  function onClick(event) {
    navigate("/adoptions/create");
  }

  return (
    <Loader loading={adoptionsLoading}>
      <div className="float-right">
        <button className="button" onClick={onClick}>
          Crear anuncio
        </button>
      </div>

      <Table
        headers={[
          { key: "pet_name", name: "Nombre" },
          { key: "pet_age", name: "Edad" },
          { key: "pet_size", name: "Tamaño" },
          { key: "pet_gender", name: "Sexo" },
          { key: "status", name: "Estado" },
          {
            key: "date_created",
            name: "fecha publicacion",
            wrapper: dateCreatedWrapper,
          },
          { wrapper: seeDetailWrapper },
        ]}
        data={adoptionList}
      />
    </Loader>
  );
}

function dateCreatedWrapper(value, adoption) {
  return value.split("T")[0];
}

function seeDetailWrapper(value, adoption) {
  return <Link to={`/adoptions/${adoption.id}`}>Ver detalle</Link>;
}
