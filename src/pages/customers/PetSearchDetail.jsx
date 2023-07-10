import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import PetSearchesContext from "../../contexts/PetSearchesContext";
import AuthContext from "../../contexts/AuthContext";
import ContactForm from "../../components/contact/ContactForm";

export default function PetSearchDetailPage() {
  const params = useParams();
  const {
    petSearchesLoading,
    retrievePetSearch,
    petSearchDetail,
    cancelPetSearch,
    completePetSearch,
    contactPetSearch,
    createPetSearchError,
  } = useContext(PetSearchesContext);

  const { userDetail } = useContext(AuthContext);

  useEffect(() => {
    retrievePetSearch(params.petSearchId);
  }, []);

  function onClickCancelPetSearch(event) {
    cancelPetSearch(petSearchDetail);
  }

  function onClickCompletePetSearch(event) {
    completePetSearch(petSearchDetail);
  }

  function onSubmitContactPetSearch(contactData) {
    contactPetSearch(petSearchDetail, contactData);
  }

  return (
    <>
      <h1>Anuncio de busqueda</h1>

      <hr></hr>

      <Loader loading={petSearchesLoading}>
        {petSearchDetail.is_mine ? (
          <div className="row">
            {petSearchDetail.can_cancel ? (
              <div className="column">
                <button
                  className="button container"
                  onClick={onClickCancelPetSearch}
                >
                  Cancelar
                </button>
              </div>
            ) : null}
            {petSearchDetail.can_complete ? (
              <div className="column">
                <button
                  className="button container"
                  onClick={onClickCompletePetSearch}
                >
                  Completar
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        <div>
          <p>Nombre: {petSearchDetail.pet_name}</p>
          <p>Edad: {petSearchDetail.pet_age}</p>
          <p>Sexo: {petSearchDetail.pet_gender}</p>
          <p>Raza: {petSearchDetail.pet_breed}</p>
          <p>Tamaño: {petSearchDetail.pet_size}</p>
          <p>Color: {petSearchDetail.pet_color}</p>
          <p>Zona: {petSearchDetail.last_seen_area}</p>
          <p>Estado: {petSearchDetail.status}</p>
          <p>Fecha de creacion: {petSearchDetail.created_at}</p>
        </div>

        {petSearchDetail.can_contact && !petSearchDetail.is_mine ? (
          <>
            <hr></hr>
            <h2>Contactar</h2>
            <ContactForm
              onSubmit={onSubmitContactPetSearch}
              errors={createPetSearchError}
              customer={userDetail}
            />
          </>
        ) : null}
      </Loader>
    </>
  );
}
