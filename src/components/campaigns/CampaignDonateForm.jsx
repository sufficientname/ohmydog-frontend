export default function CampaignDonateForm({ onSubmit, errors, customer }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    console.log("submitting", values);

    onSubmit(values);
  };

  const errorsCreditCard = errors.credit_card || {};

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="column">
          <fieldset>
            <h4>Datos del donador</h4>

            {errors.non_field_errors ? (
              <p style={{ color: "red" }}>{errors.non_field_errors[0]}</p>
            ) : null}

            <label htmlFor="donorFirstNameField">Nombre</label>
            <input
              type="text"
              name="donor_first_name"
              id="donorFirstNameField"
              defaultValue={customer.first_name}
            />
            {errors.donor_first_name ? (
              <p style={{ color: "red" }}>{errors.donor_first_name[0]}</p>
            ) : null}

            <label htmlFor="donorLastnameField">Apellido</label>
            <input
              type="text"
              name="donor_last_name"
              id="donorLastnameField"
              defaultValue={customer.last_name}
            />
            {errors.donor_last_name ? (
              <p style={{ color: "red" }}>{errors.donor_last_name[0]}</p>
            ) : null}

            <label htmlFor="donorEmailField">Email</label>
            <input
              type="text"
              name="donor_email"
              id="donorEmailField"
              defaultValue={customer.email}
            />
            {errors.donor_email ? (
              <p style={{ color: "red" }}>{errors.donor_email[0]}</p>
            ) : null}

            <label htmlFor="donorPhoneNumberField">Telefono</label>
            <input
              type="tel"
              name="donor_phone_number"
              id="donorPhoneNumberField"
              defaultValue={customer.phone_number}
            />
            {errors.donor_phone_number ? (
              <p style={{ color: "red" }}>{errors.donor_phone_number[0]}</p>
            ) : null}

            <label htmlFor="amountField">Monto</label>
            <input type="number" name="amount" step=".01" id="amountField" />
            {errors.amount ? (
              <p style={{ color: "red" }}>{errors.amount[0]}</p>
            ) : null}
          </fieldset>
        </div>

        {/* CREDIT CARD FIELDS */}
        <div className="column">
          <fieldset>
            <h4>Datos de la tarjeta</h4>

            {errorsCreditCard.non_field_errors ? (
              <p style={{ color: "red" }}>
                {errorsCreditCard.non_field_errors[0]}
              </p>
            ) : null}

            <label htmlFor="creditCardNameOnCardField">
              Nombre en la tarjeta
            </label>
            <input
              type="text"
              name="credit_card.name_on_card"
              id="creditCardNameOnCardField"
            />
            {errorsCreditCard.name_on_card ? (
              <p style={{ color: "red" }}>{errorsCreditCard.name_on_card[0]}</p>
            ) : null}

            <div className="row">
              <div className="column">
                <label htmlFor="creditCardCardNumberField">
                  Numero de tarjeta
                </label>
                <input
                  type="text"
                  name="credit_card.card_number"
                  id="creditCardCardNumberField"
                />
                {errorsCreditCard.card_number ? (
                  <p style={{ color: "red" }}>
                    {errorsCreditCard.card_number[0]}
                  </p>
                ) : null}
              </div>

              <div className="column column-25">
                <label htmlFor="creditCardCvvField">CVV</label>
                <input
                  type="text"
                  name="credit_card.cvv"
                  id="creditCardCvvField"
                />
                {errorsCreditCard.cvv ? (
                  <p style={{ color: "red" }}>{errorsCreditCard.cvv[0]}</p>
                ) : null}
              </div>
            </div>

            <label htmlFor="creditCardExpirationDateField">
              Fecha de vencimiento
            </label>
            <input
              type="date"
              name="credit_card.expiration_date"
              id="creditCardExpirationDateField"
            />
            {errorsCreditCard.expiration_date ? (
              <p style={{ color: "red" }}>
                {errorsCreditCard.expiration_date[0]}
              </p>
            ) : null}
          </fieldset>
        </div>
      </div>
      <input className="button-primary container" type="submit" value="Donar" />
    </form>
  );
}
