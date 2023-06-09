import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import Table from "../../components/table";
import AdoptionsContext from "../../contexts/AdoptionsContext";

export default function AdoptionListPublicPage() {
  const { adoptionsLoading, listAdoptions, adoptionList } =
    useContext(AdoptionsContext);

  useEffect(() => {
    listAdoptions();
  }, []);

  return (
    <Loader loading={adoptionsLoading}>
      <Table
        headers={[
          { key: "pet_name", label: "Nombre" },
          { key: "pet_age", label: "Edad" },
          { key: "pet_size", label: "Tamaño" },
          { key: "pet_gender", label: "Sexo" },
          { key: "status", label: "Estado" },
          {
            key: "date_created",
            label: "fecha publicacion",
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
