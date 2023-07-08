import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PetSearchesContext from "../../contexts/PetSearchesContext";
import PetSearchCreateForm from "../../components/petsearches/PetSearchCreateForm";

export default function PetSearchCreatePage() {
  const navigate = useNavigate();
  const { createPetSearch, createPetSearchError } =
    useContext(PetSearchesContext);

  function onCreate(data) {
    navigate(`/petsearches/${data.id}`);
  }

  function onSubmit(data) {
    createPetSearch(data, onCreate);
  }

  return (
    <>
      <h1>Publicar anuncio de busqueda</h1>

      <hr></hr>

      <PetSearchCreateForm onSubmit={onSubmit} errors={createPetSearchError} />
    </>
  );
}
