import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Table from "../../components/table";
import AdoptionsContext from "../../contexts/AdoptionsContext";

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
    <>
      <h1>Anuncios de adopcion</h1>

      <div className="row">
        <div className="column"></div>
        <div className="column"></div>
        <div className="column">
          <button className="button container" onClick={onClick}>
            Crear anuncio
          </button>
        </div>
      </div>

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
