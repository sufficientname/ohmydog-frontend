import { useContext, useEffect } from "react";
import PetsAdminContext from "../contexts/PetsAdminContext";
import PetsTableAdmin from "../components/pets/PetsTableAdmin";

function PetListAdminPage() {
  const { petsAdminLoading, listAdminPets, petAdminList } =
    useContext(PetsAdminContext);

  useEffect(() => {
    listAdminPets();
  }, []);

  if (petsAdminLoading) {
    return <p>cargando...</p>;
  }

  return (
    <>
      <PetsTableAdmin pets={petAdminList} />
    </>
  );
}

export default PetListAdminPage;
