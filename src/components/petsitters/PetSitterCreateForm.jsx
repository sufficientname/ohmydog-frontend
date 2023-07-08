const serviceTypes = [
  { id: "PASEADOR", name: "Paseador" },
  { id: "CUIDADOR", name: "Cuidador" },
];

const serviceAreas = [
  "Plaza Moreno",
  "Plaza San Martín",
  "Plaza Malvinas Argentinas",
  "Plaza Rivadavia",
  "Parque Vucetich",
  "Plaza Rocha",
  "Plaza Italia",
  "Parque Saavedra",
  "Plaza Matheu",
  "Plaza España",
  "Plaza Sarmiento",
  "Parque Castelli",
  "Plaza Perón",
  "Plaza Yrigoyen",
  "Plaza Rosas",
  "Plaza Alsina",
  "Plaza Olazábal",
  "Plaza Belgrano",
  "Plaza Güemes",
  "Parque Alberti",
  "Plaza 19 de Noviembre",
  "Plaza Azcuénaga",
  "Plaza Paso",
];

export default function PetSitterCreateForm({ onSubmit, errors }) {
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

        <label htmlFor="sitterFirstNameField">Nombre</label>
        <input type="text" name="sitter_first_name" id="sitterFirstNameField" />
        {errors.sitter_first_name ? (
          <p style={{ color: "red" }}>{errors.sitter_first_name[0]}</p>
        ) : null}

        <label htmlFor="sitterLastNameField">Apellido</label>
        <input type="text" name="sitter_last_name" id="sitterLastNameField" />
        {errors.sitter_last_name ? (
          <p style={{ color: "red" }}>{errors.sitter_last_name[0]}</p>
        ) : null}

        <label htmlFor="sitterEmailField">Email</label>
        <input type="text" name="sitter_email" id="sitterEmailField" />
        {errors.sitter_email ? (
          <p style={{ color: "red" }}>{errors.sitter_email[0]}</p>
        ) : null}

        <label htmlFor="sitterPhoneNumberField">Telefono</label>
        <input
          type="text"
          name="sitter_phone_number"
          id="sitterPhoneNumberField"
        />
        {errors.sitter_phone_number ? (
          <p style={{ color: "red" }}>{errors.sitter_phone_number[0]}</p>
        ) : null}

        <label htmlFor="serviceTypeField">Servicio</label>
        <select name="service_type" id="serviceTypeField">
          {serviceTypes.map((serviceType, i) => (
            <option value={serviceType.id} key={i}>
              {serviceType.name}
            </option>
          ))}
        </select>
        {errors.service_type ? (
          <p style={{ color: "red" }}>{errors.service_type[0]}</p>
        ) : null}

        <label htmlFor="serviceAreaField">Zona</label>
        <select name="service_area" id="serviceAreaField">
          {serviceAreas.map((serviceArea, i) => (
            <option value={serviceArea} key={i}>
              {serviceArea}
            </option>
          ))}
        </select>
        {errors.service_area ? (
          <p style={{ color: "red" }}>{errors.service_area[0]}</p>
        ) : null}

        <input className="button-primary" type="submit" value="Publicar" />
      </fieldset>
    </form>
  );
}
