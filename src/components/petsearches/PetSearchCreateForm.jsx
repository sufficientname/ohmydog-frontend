import { breeds } from "../../utils/breeds";

const sizes = [
  { id: "PEQUENO", name: "Pequeño" },
  { id: "MEDIANO", name: "Mediano" },
  { id: "GRANDE", name: "Grande" },
];

const genders = [
  { id: "MACHO", name: "Macho" },
  { id: "HEMBRA", name: "Hembra" },
];

export default function PetSearchCreateForm({ onSubmit, errors }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    console.log("submitting", values);

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        {errors.non_field_errors ? (
          <p style={{ color: "red" }}>{errors.non_field_errors[0]}</p>
        ) : null}

        <label htmlFor="petNameField">Nombre</label>
        <input type="text" name="pet_name" id="petNameField" />
        {errors.pet_name ? (
          <p style={{ color: "red" }}>{errors.pet_name[0]}</p>
        ) : null}

        <label htmlFor="petAgeField">Edad</label>
        <input type="number" name="pet_age" id="petAgeField" />
        {errors.pet_age ? (
          <p style={{ color: "red" }}>{errors.pet_age[0]}</p>
        ) : null}

        <label htmlFor="petGenderField">Sexo</label>
        <select name="pet_gender" id="petGenderField">
          {genders.map((gender, i) => (
            <option value={gender.id} key={i}>
              {gender.name}
            </option>
          ))}
        </select>
        {errors.pet_gender ? (
          <p style={{ color: "red" }}>{errors.pet_gender[0]}</p>
        ) : null}

        <label htmlFor="petBreedField">Raza</label>
        <select name="pet_breed" id="petBreedField">
          {breeds.map((breed, i) => (
            <option value={breed} key={i}>
              {breed}
            </option>
          ))}
        </select>
        {errors.pet_breed ? (
          <p style={{ color: "red" }}>{errors.breed[0]}</p>
        ) : null}

        <label htmlFor="petSizeField">Tamaño</label>
        <select name="pet_size" id="petSizeField">
          {sizes.map((size, i) => (
            <option value={size.id} key={i}>
              {size.name}
            </option>
          ))}
        </select>
        {errors.pet_size ? (
          <p style={{ color: "red" }}>{errors.pet_size[0]}</p>
        ) : null}

        <label htmlFor="petColorField">Color</label>
        <input type="text" name="pet_color" id="petColorField" />
        {errors.pet_color ? (
          <p style={{ color: "red" }}>{errors.pet_color[0]}</p>
        ) : null}

        <label htmlFor="lastSeenAreaField">Zona</label>
        <input type="text" name="last_seen_area" id="lastSeenAreaField" />
        {errors.last_seen_area ? (
          <p style={{ color: "red" }}>{errors.last_seen_area[0]}</p>
        ) : null}

        <br></br>

        <input
          className="button-primary container"
          type="submit"
          value="Publicar"
        />
      </fieldset>
    </form>
  );
}
