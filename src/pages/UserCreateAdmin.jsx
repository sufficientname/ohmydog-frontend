import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UsersAdminContext from "../contexts/UsersAdminContext";
import CreateUserAdminForm from "../components/users/CreateUserAdminForm";
import PetsAdminContext from "../contexts/PetsAdminContext";
import CreatePetAdminForm from "../components/pets/CreatePetAdminForm";

export default function AppointmentCreatePage() {
  const [step, setStep] = useState(0);

  const { userDetail, createUser, createUserError } =
    useContext(UsersAdminContext);
  const { createPet, createPetError } = useContext(PetsAdminContext);

  function onClickSkip(event) {
    setStep(2);
  }

  function onSubmitUser(data) {
    createUser(data, () => setStep(1));
  }

  function onSubmitPet(data) {
    createPet(data, () => setStep(2));
  }

  if (step == 0) {
    return (
      <CreateUserAdminForm onSubmit={onSubmitUser} errors={createUserError} />
    );
  }

  if (step == 1) {
    return (
      <>
        <CreatePetAdminForm
          users={[userDetail]}
          onSubmit={onSubmitPet}
          errors={createPetError}
        />
        <button className="button" onClick={onClickSkip}>
          Omitir
        </button>
      </>
    );
  }

  if (step == 2) {
    return <Navigate to={`/admin/users/${userDetail.id}`} />;
  }

  return null;
}
