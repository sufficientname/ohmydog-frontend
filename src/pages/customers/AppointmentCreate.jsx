import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentsContext from "../../contexts/AppointmentsContext";
import PetsContext from "../../contexts/PetsContext";
import AppointmentRequestForm from "../../components/appointments/AppointmentRequestForm";

export default function AppointmentCreatePage() {
  const { createAppointment, createAppointmentError } =
    useContext(AppointmentsContext);
  const { listPets, petList } = useContext(PetsContext);
  const navigate = useNavigate();

  useEffect(() => {
    listPets();
  }, []);

  function onCreate(data) {
    navigate(`/appointments/${data.id}`);
  }

  function onSubmit(data) {
    createAppointment(data, onCreate);
  }

  return (
    <>
      <h1>solicitar turno</h1>
      <AppointmentRequestForm
        onSubmit={onSubmit}
        errors={createAppointmentError}
        pets={petList}
      />
    </>
  );
}
