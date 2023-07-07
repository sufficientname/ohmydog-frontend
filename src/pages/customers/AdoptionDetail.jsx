import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import AdoptionsContext from "../../contexts/AdoptionsContext";
import AuthContext from "../../contexts/AuthContext";
import ContactForm from "../../components/contact/ContactForm";

export default function AdoptionDetailPage() {
  const params = useParams();
  const {
    adoptionsLoading,
    retrieveAdoption,
    adoptionDetail,
    cancelAdoption,
    completeAdoption,
    contactAdoption,
    createAdoptionError,
  } = useContext(AdoptionsContext);

  const { userDetail } = useContext(AuthContext);

  useEffect(() => {
    retrieveAdoption(params.adoptionId);
  }, []);

  function onClickCancelAdoption(event) {
    cancelAdoption(adoptionDetail);
  }

  function onClickCompleteAdoption(event) {
    completeAdoption(adoptionDetail);
  }

  function onSubmitContactAdoption(contactData) {
    contactAdoption(adoptionDetail, contactData);
  }

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
          <p>Fecha de creación: {adoptionDetail.date_created}</p>
        </div>
      </Loader>

      {adoptionDetail.is_mine ? (
        <div className="row">
          {adoptionDetail.can_cancel ? (
            <div className="column">
              <button className="button" onClick={onClickCancelAdoption}>
                Cancelar
              </button>
            </div>
          ) : null}
          {adoptionDetail.can_complete ? (
            <div className="column">
              <button className="button" onClick={onClickCompleteAdoption}>
                Completar
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {adoptionDetail.can_contact && !adoptionDetail.is_mine ? (
        <>
          <hr></hr>
          <h2>Contactar</h2>
          <ContactForm
            onSubmit={onSubmitContactAdoption}
            errors={createAdoptionError}
            customer={userDetail}
          />
        </>
      ) : null}
    </>
  );
}
