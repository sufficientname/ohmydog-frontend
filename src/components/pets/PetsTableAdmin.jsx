import { Link } from "react-router-dom";

function PetTableRow({ pet }) {
  return (
    <tr>
      <td>{pet.user_fullname}</td>
      <td>{pet.name}</td>
      <td>{pet.breed}</td>
      <td>{pet.color}</td>
      <td>{pet.birthdate}</td>
      <td>
        <Link to={`/pets/${pet.id}`}>Ver detalle</Link>
      </td>
    </tr>
  );
}

export default function PetsTable({ pets }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Nombre</th>
          <th>Raza</th>
          <th>Color</th>
          <th>Fecha de nacimiento</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pets.map((pet) => (
          <PetTableRow pet={pet} key={pet.id} />
        ))}
      </tbody>
    </table>
  );
}
