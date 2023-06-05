import { useContext, useEffect } from "react";
import PetsAdminContext from "../contexts/PetsAdminContext";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

export default function PetDetailAdminPage() {
  const params = useParams();
  const { petsLoading, retrievePet, petDetail } = useContext(PetsAdminContext);

  useEffect(() => {
    retrievePet(params.petId);
  }, []);

  return (
    <Loader loading={petsLoading}>
      <div>
        <p>Cliente: {petDetail.user_fullname}</p>
        <p>Nombre: {petDetail.name}</p>
        <p>Raza: {petDetail.breed}</p>
        <p>Color: {petDetail.color}</p>
        <p>Fecha de nacimiento: {petDetail.birthdate}</p>
      </div>
    </Loader>
  );
}
