export default function AppointmentAcceptForm({ onSubmit, errors, petList }) {
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const values = Object.fromEntries(data.entries());

        console.log('submitting', values);

        onSubmit(values)
    }

    return (
        <form onSubmit={handleSubmit}>

            <fieldset>
                {errors.non_field_errors ? <p style={{ color: 'red' }}>{errors.non_field_errors[0]}</p> : null}

                <label htmlFor="actualDatetimeField">Fecha</label>
                <input type="datetime-local" name="actual_datetime" id="actualDatetimeField" />
                { errors.actual_datetime ? <p style={{ color: 'red' }}>{errors.actual_datetime[0]}</p> : null }

                <input className="button-primary" type="submit" value="Aceptar turno" />
            </fieldset>
        </form>
    )
}