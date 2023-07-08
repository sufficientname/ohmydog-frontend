import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import AdoptionsAdminContext from "../../contexts/AdoptionsAdminContext";

export default function AdoptionDetailAdminPage() {
  const params = useParams();
  const { adoptionsLoading, retrieveAdoption, adoptionDetail } = useContext(
    AdoptionsAdminContext
  );

  useEffect(() => {
    retrieveAdoption(params.adoptionId);
  }, []);

  return (
    <>
      <h1>Anuncio de adopcion</h1>

      <hr></hr>

      <Loader loading={adoptionsLoading}>
        <div>
          <p>Nombre: {adoptionDetail.pet_name}</p>
          <p>Edad: {adoptionDetail.pet_age}</p>
          <p>Tamaño: {adoptionDetail.pet_size}</p>
          <p>Sexo: {adoptionDetail.pet_gender}</p>
          <p>Estado: {adoptionDetail.status}</p>
          <p>Fecha de creacion: {adoptionDetail.date_created}</p>
        </div>
      </Loader>
    </>
  );
}
