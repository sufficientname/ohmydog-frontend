import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import AdoptionsContext from "../../contexts/AdoptionsContext";

export default function AdoptionDetailPage() {
  const params = useParams();
  const {
    adoptionsLoading,
    retrieveAdoption,
    adoptionDetail,
    cancelAdoption,
    completeAdoption,
  } = useContext(AdoptionsContext);

  useEffect(() => {
    retrieveAdoption(params.adoptionId);
  }, []);

  function onClickCancelAdoption(event) {
    cancelAdoption(adoptionDetail);
  }

  function onClickCompleteAdoption(event) {
    completeAdoption(adoptionDetail);
  }

  return (
    <>
      <h1>Anuncio de adopcion</h1>

      <Loader loading={adoptionsLoading}>
        <div>
          <p>Nombre: {adoptionDetail.pet_name}</p>
          <p>Edad: {adoptionDetail.pet_age}</p>
          <p>Tamaño: {adoptionDetail.pet_size}</p>
          <p>Sexo: {adoptionDetail.pet_gender}</p>
          <p>Estado: {adoptionDetail.status}</p>
          <p>Fecha de creación: {adoptionDetail.date_created}</p>
        </div>
      </Loader>

      <div className="row">
        {adoptionDetail.can_cancel ? (
          <div className="column">
            <button
              className="button"
              onClick={onClickCancelAdoption}
              disabled={!adoptionDetail.can_cancel}
            >
              Cancelar
            </button>
          </div>
        ) : null}
        {adoptionDetail.can_complete ? (
          <div className="column">
            <button
              className="button"
              onClick={onClickCompleteAdoption}
              disabled={!adoptionDetail.can_complete}
            >
              Completar
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
