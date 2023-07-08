import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import PetSearchesAdminContext from "../../contexts/PetSearchesAdminContext";

export default function PetSearchDetailAdminPage() {
  const params = useParams();
  const { petSearchesLoading, retrievePetSearch, petSearchDetail } = useContext(
    PetSearchesAdminContext
  );

  useEffect(() => {
    retrievePetSearch(params.petSearchId);
  }, []);

  return (
    <>
      <h1>Anuncio de busqueda</h1>

      <hr></hr>

      <Loader loading={petSearchesLoading}>
        <div>
          <p>Nombre: {petSearchDetail.pet_name}</p>
          <p>Edad: {petSearchDetail.pet_age}</p>
          <p>Sexo: {petSearchDetail.pet_gender}</p>
          <p>Raza: {petSearchDetail.pet_breed}</p>
          <p>Tamaño: {petSearchDetail.pet_size}</p>
          <p>Color: {petSearchDetail.pet_color}</p>
          <p>Zona: {petSearchDetail.last_seen_area}</p>
          <p>Estado: {petSearchDetail.status}</p>
          <p>Fecha de creacion: {petSearchDetail.date_created}</p>
        </div>
      </Loader>
    </>
  );
}
