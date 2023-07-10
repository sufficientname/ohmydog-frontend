import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PetsContext from "../../contexts/PetsContext";
import CreatePetForm from "../../components/pets/CreatePetForm";

export default function PetCreatePage() {
  const navigate = useNavigate();
  const { createPet, createPetError } = useContext(PetsContext);

  function onCreate(data) {
    navigate(`/pets/${data.id}`);
  }

  function onSubmitCreatePet(data) {
    createPet(data, onCreate);
  }

  return (
    <>
      <h1>Agregar mascota</h1>

      <hr></hr>

      <CreatePetForm onSubmit={onSubmitCreatePet} errors={createPetError} />
    </>
  );
}
