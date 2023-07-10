import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import PetSittersContext from "../../contexts/PetSittersContext";
import AuthContext from "../../contexts/AuthContext";
import ContactForm from "../../components/contact/ContactForm";

export default function PetSitterDetailPage() {
  const params = useParams();
  const {
    petSittersLoading,
    petSitterDetail,
    retrievePetSitter,
    contactPetSitter,
    createPetSitterError,
  } = useContext(PetSittersContext);

  const { userDetail } = useContext(AuthContext);

  useEffect(() => {
    retrievePetSitter(params.petSitterId);
  }, []);

  function onSubmitContactPetSitter(contactData) {
    contactPetSitter(petSitterDetail, contactData);
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
          <p>Fecha de creacion: {petSitterDetail.created_at}</p>
        </div>

        {petSitterDetail.can_contact ? (
          <>
            <hr></hr>
            <h2>Contactar</h2>
            <ContactForm
              onSubmit={onSubmitContactPetSitter}
              errors={createPetSitterError}
              customer={userDetail}
            />
          </>
        ) : null}
      </Loader>
    </>
  );
}
