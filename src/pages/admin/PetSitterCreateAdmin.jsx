import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PetSittersAdminContext from "../../contexts/PetSittersAdminContext";
import PetSitterCreateForm from "../../components/petsitters/PetSitterCreateForm";

export default function PetSitterCreateAdminPage() {
  const navigate = useNavigate();
  const { createPetSitter, createPetSitterError } = useContext(
    PetSittersAdminContext
  );

  function onCreate(data) {
    navigate(`/admin/petsitters/${data.id}`);
  }

  function onSubmit(data) {
    createPetSitter(data, onCreate);
  }

  return (
    <>
      <h1>Publicar anuncio de paseador o cuidador</h1>

      <hr></hr>

      <PetSitterCreateForm onSubmit={onSubmit} errors={createPetSitterError} />
    </>
  );
}
