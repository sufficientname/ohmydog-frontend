import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdoptionsContext from "../../contexts/AdoptionsContext";
import AdoptionCreateForm from "../../components/adoptions/AdoptionCreateForm";

export default function AdoptionCreatePage() {
  const navigate = useNavigate();
  const { createAdoption, createAdoptionError } = useContext(AdoptionsContext);

  function onCreate(data) {
    navigate(`/adoptions/${data.id}`);
  }

  function onSubmit(data) {
    createAdoption(data, onCreate);
  }

  return (
    <>
      <h1>Publicar anuncio de adopcion</h1>

      <hr></hr>

      <AdoptionCreateForm onSubmit={onSubmit} errors={createAdoptionError} />
    </>
  );
}
