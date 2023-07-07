import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import AdoptionsContext from "../../contexts/AdoptionsContext";
import ContactForm from "../../components/contact/ContactForm";
import AuthContext from "../../contexts/AuthContext";

export default function AdoptionDetailPublicPage() {
  const params = useParams();
  const { adoptionsLoading, retrieveAdoption, adoptionDetail, contactAdoption, createAdoptionError } =
    useContext(AdoptionsContext);

  const {
      userDetail,
    } = useContext(AuthContext);

  useEffect(() => {
    retrieveAdoption(params.adoptionId);
  }, []);

  const onSubmitContactAdoption = data => {
    contactAdoption(adoptionDetail, data)
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

        {adoptionDetail.can_contact ? (
        <>
            <hr />
            <h2>Contactar</h2>
              <ContactForm 
                onSubmit={onSubmitContactAdoption}
                errors={createAdoptionError}
                customer={userDetail}
              />
        </>
          ) : null}
      </Loader>
    </>
  );
}
