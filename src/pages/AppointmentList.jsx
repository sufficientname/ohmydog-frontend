import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentsContext from "../contexts/AppointmentsContext";
import AppointmentsTable from "../components/appointments/AppointmentsTable";
import PetsContext from "../contexts/PetsContext";

function AppointmentListPage() {
  const { appointmentsLoading, listAppointments, appointmentList } =
    useContext(AppointmentsContext);
  const { listPets } = useContext(PetsContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/appointments/create");
  };

  useEffect(() => {
    listAppointments();
    listPets();
  }, []);

  if (appointmentsLoading) {
    return <p>cargando...</p>;
  }

  return (
    <>
      <div className="float-right">
        <button className="button" onClick={handleClick}>
          Solicitar turno
        </button>
      </div>

      <AppointmentsTable appointments={appointmentList} />
    </>
  );
}

export default AppointmentListPage;
