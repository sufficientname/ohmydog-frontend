import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table";
import AdoptionsContext from "../../contexts/AdoptionsContext";

export default function AdoptionListPublicPage() {
  const { adoptionsLoading, listAdoptions, adoptionList } =
    useContext(AdoptionsContext);

  useEffect(() => {
    listAdoptions();
  }, []);

  return (
    <>
      <h1>Anuncios de adopcion</h1>

      <hr></hr>

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
