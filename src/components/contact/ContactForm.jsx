export default function ContactForm({ onSubmit, errors, customer }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    console.log("submitting", values);

    onSubmit(values);
  };

    // Dado un usuario visitante o cliente, con mail valido "juan@gmail.com" y telefono valido '2214567879'
    // Cuando el usuario o cliente selecciona un anuncio e
    // ingresa nombre 'Juan', apellido 'Perez', teléfono '2214567879, email 'juan@gmail.com'
    //  y motivo 'Deseo establecer contacto' y presiona enviar.
    // Entonces el sistema envia un mail a "juan@gmail.com" y al anunciate, y muestra el mensaje 'Mensaje enviado'.
    // {
    //   "id": 3,
    //   "email": "user2@mail.com",
    //   "first_name": "user",
    //   "last_name": "two",
    //   "is_staff": false,
    //   "id_number": "2222",
    //   "phone_number": "(221) 222-2222",
    //   "birthdate": "2002-02-02",
    //   "password_set": true
    // }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        {errors.non_field_errors ? (
          <p style={{ color: "red" }}>{errors.non_field_errors[0]}</p>
        ) : null}

        <label htmlFor="firstnameField">Nombre</label>
        <input type="text" name="first_name" id="firstnameField" value={customer.first_name} />
        {errors.first_name ? (
          <p style={{ color: "red" }}>{errors.first_name[0]}</p>
        ) : null}

        <label htmlFor="lastnameField">Apellido</label>
        <input type="text" name="last_name" id="lastnameField" value={customer.last_name} />
        {errors.last_name ? (
          <p style={{ color: "red" }}>{errors.last_name[0]}</p>
        ) : null}
        
        <label htmlFor="emailField">Email</label>
        <input type="text" name="email" id="emailField" value={customer.email} />
        {errors.email ? (
          <p style={{ color: "red" }}>{errors.email[0]}</p>
        ) : null}

        <label htmlFor="phoneNumberField">Telefono</label>
        <input type="tel" name="phone_number" id="phoneNumberField" value={customer.phone_number} />
        {errors.phone_number ? (
          <p style={{ color: "red" }}>{errors.phone_number[0]}</p>
        ) : null}

        <label htmlFor="reasonField">Motivo</label>
        <textarea name="reason" id="reasonField" />
        {errors.reason ? (
          <p style={{ color: "red" }}>{errors.reason[0]}</p>
        ) : null}

        <input className="button-primary" type="submit" value="Agregar" />
      </fieldset>
    </form>
  );
}
