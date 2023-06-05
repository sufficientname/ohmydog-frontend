import { useContext, useEffect, useState } from "react";
import PetsContext from "../contexts/PetsContext";
import { useParams } from "react-router-dom";

function PetDetailPage() {
  const params = useParams();
  const { petsLoading, retrievePet, petDetail } = useContext(PetsContext);

  useEffect(() => {
    retrievePet(params.petId);
  }, []);

  if (petsLoading) {
    return <p>cargando...</p>;
  }

  return (
    <>
      <div>
        <p>Nombre: {petDetail.name}</p>
        <p>Raza: {petDetail.breed}</p>
        <p>Color: {petDetail.color}</p>
        <p>Fecha de nacimiento: {petDetail.birthdate}</p>
      </div>
    </>
  );
}

export default PetDetailPage;
