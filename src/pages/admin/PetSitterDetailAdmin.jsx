import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import PetSitterPauseRangeForm from "../../components/petsitters/PetSitterPauseRangeForm";
import PetSittersAdminContext from "../../contexts/PetSittersAdminContext";

export default function PetSitterDetailAdminPage() {
  const params = useParams();
  const {
    petSittersLoading,
    retrievePetSitter,
    petSitterDetail,
    cancelPetSitter,
    completePetSitter,
    createPetSitterError,
    unpausePetSitter,
    pauseRangePetSitter,
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

  function onClickUnpausePetSitter(event) {
    unpausePetSitter(petSitterDetail);
  }

  function onSubmitPauseRangePetSitter(data) {
    pauseRangePetSitter(petSitterDetail, data);
  }

  return (
    <>
      <h1>Anuncio de paseador o cuidador</h1>

      <Loader loading={petSittersLoading}>
        <div className="row">
          {petSitterDetail.can_cancel ? (
            <div className="column">
              <button
                className="button container"
                onClick={onClickCancelPetSitter}
              >
                Cancelar
              </button>
            </div>
          ) : null}
          {petSitterDetail.can_complete ? (
            <div className="column">
              <button
                className="button container"
                onClick={onClickCompletePetSitter}
              >
                Completar
              </button>
            </div>
          ) : null}
          {petSitterDetail.can_unpause ? (
            <div className="column">
              <button
                className="button container"
                onClick={onClickUnpausePetSitter}
              >
                Despausar
              </button>
            </div>
          ) : null}
        </div>

        <hr></hr>

        <div className="row">
          <div className="column">
            <div>
              <p>Nombre: {petSitterDetail.sitter_first_name}</p>
              <p>Apellido: {petSitterDetail.sitter_last_name}</p>
              <p>Email: {petSitterDetail.sitter_email}</p>
              <p>Telefono: {petSitterDetail.sitter_phone_number}</p>
              <p>Servicio: {petSitterDetail.service_type}</p>
              <p>Zona: {petSitterDetail.service_area}</p>
              <p>Estado: {petSitterDetail.status}</p>
              <p>Fecha de creacion: {petSitterDetail.created_at}</p>
              <p>Fecha inicio de pausa: {petSitterDetail.pause_start_date}</p>
              <p>Fecha fin de pausa: {petSitterDetail.pause_end_date}</p>
            </div>
          </div>

          <div className="column">
            {petSitterDetail.can_pause ? (
              <PetSitterPauseRangeForm
                onSubmit={onSubmitPauseRangePetSitter}
                errors={createPetSitterError}
              />
            ) : null}
          </div>
        </div>
      </Loader>
    </>
  );
}
