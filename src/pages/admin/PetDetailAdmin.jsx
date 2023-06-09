import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../../components/loader";
import Table from "../../components/table";
import PetsAdminContext from "../../contexts/PetsAdminContext";
import AppointmentsAdminContext from "../../contexts/AppointmentsAdminContext";

export default function PetDetailAdminPage() {
  const params = useParams();
  const { petsLoading, retrievePet, petDetail } = useContext(PetsAdminContext);

  const { appointmentsLoading, appointmentList, listAppointments } = useContext(
    AppointmentsAdminContext
  );

  useEffect(() => {
    retrievePet(params.petId);
    listAppointments({ pet: params.petId, status: "COM" });
  }, []);

  return (
    <>
      <h1>Mascota</h1>
      <Loader loading={petsLoading}>
        <div>
          <p>Cliente: {petDetail.user_fullname}</p>
          <p>Nombre: {petDetail.name}</p>
          <p>Raza: {petDetail.breed}</p>
          <p>Color: {petDetail.color}</p>
          <p>Fecha de nacimiento: {petDetail.birthdate}</p>
        </div>
      </Loader>

      <hr></hr>

      <h2>Historial de atencion</h2>
      <Table
        headers={[
          { key: "reason", label: "Motivo" },
          { key: "status", label: "Estado" },
          { key: "date", label: "Fecha" },
          {
            key: "hour",
            label: "Hora",
            wrapper: (value, appointment) =>
              appointment.hour || appointment.timeslot,
          },
          {
            wrapper: (value, appointment) => (
              <Link to={`/admin/appointments/${appointment.id}`}>
                Ver detalle
              </Link>
            ),
          },
        ]}
        data={appointmentList}
        loading={appointmentsLoading}
      />

      <hr></hr>

      <h2>Libreta sanitaria</h2>
    </>
  );
}
