const sizes = [
  { id: "PEQUENO", name: "Pequeño" },
  { id: "MEDIANO", name: "Mediano" },
  { id: "GRANDE", name: "Grande" },
];

const genders = [
  { id: "MACHO", name: "Macho" },
  { id: "HEMBRA", name: "Hembra" },
];

export default function AdoptionCreateForm({ onSubmit, errors }) {
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

        <input className="button-primary" type="submit" value="Agregar" />
      </fieldset>
    </form>
  );
}
