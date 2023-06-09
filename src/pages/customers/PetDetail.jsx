import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../../components/loader";
import Table from "../../components/table";
import PetsContext from "../../contexts/PetsContext";
import AppointmentsContext from "../../contexts/AppointmentsContext";

export default function PetDetailPage() {
  const params = useParams();
  const { petsLoading, retrievePet, petDetail } = useContext(PetsContext);
  const { appointmentsLoading, appointmentList, listAppointments } =
    useContext(AppointmentsContext);

  useEffect(() => {
    retrievePet(params.petId);
    listAppointments({ pet: params.petId, status: "COM" });
  }, []);

  return (
    <>
      <h1>Mascota</h1>

      <Loader loading={petsLoading}>
        <hr></hr>

        <div>
          <p>Nombre: {petDetail.name}</p>
          <p>Raza: {petDetail.breed}</p>
          <p>Color: {petDetail.color}</p>
          <p>Sexo: {petDetail.gender}</p>
          <p>Fecha de nacimiento: {petDetail.birthdate}</p>
        </div>

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
                <Link to={`/appointments/${appointment.id}`}>Ver detalle</Link>
              ),
            },
          ]}
          data={appointmentList}
          loading={appointmentsLoading}
        />

        <hr></hr>

        <h2>Libreta sanitaria</h2>
        <Table
          headers={[
            { key: "date", label: "Fecha" },
            { key: "entry_type", label: "Tipo" },
            { key: "entry_value", label: "Valor" },
          ]}
          data={petDetail.health_record}
          loading={petsLoading}
        />
      </Loader>
    </>
  );
}
