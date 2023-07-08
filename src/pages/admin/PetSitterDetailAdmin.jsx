import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import PetSittersAdminContext from "../../contexts/PetSittersAdminContext";

export default function PetSitterDetailAdminPage() {
  const params = useParams();
  const {
    petSittersLoading,
    retrievePetSitter,
    petSitterDetail,
    cancelPetSitter,
    completePetSitter,
  } = useContext(PetSittersAdminContext);

  useEffect(() => {
    retrievePetSitter(params.petSitterId);
  }, []);

  function onClickCancelPetSitter(event) {
    cancelPetSitter(petSitterDetail);
  }

  function onClickCompletePetSitter(event) {
    completePetSitter(petSitterDetail);
  }

  return (
    <>
      <h1>Anuncio de paseador o cuidador</h1>

      <hr></hr>

      <Loader loading={petSittersLoading}>
        <div>
          <p>Nombre: {petSitterDetail.sitter_first_name}</p>
          <p>Apellido: {petSitterDetail.sitter_last_name}</p>
          <p>Email: {petSitterDetail.sitter_email}</p>
          <p>Telefono: {petSitterDetail.sitter_phone_number}</p>
          <p>Servicio: {petSitterDetail.service_type}</p>
          <p>Zona: {petSitterDetail.service_area}</p>
          <p>Estado: {petSitterDetail.status}</p>
          <p>Fecha de creacion: {petSitterDetail.date_created}</p>
        </div>
        <div className="row">
          {petSitterDetail.can_cancel ? (
            <div className="column">
              <button className="button" onClick={onClickCancelPetSitter}>
                Cancelar
              </button>
            </div>
          ) : null}
          {petSitterDetail.can_complete ? (
            <div className="column">
              <button className="button" onClick={onClickCompletePetSitter}>
                Completar
              </button>
            </div>
          ) : null}
        </div>
      </Loader>
    </>
  );
}
