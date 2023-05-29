export default function AppointmentRejectForm({ onSubmit, errors, petList }) {
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

                <label htmlFor="suggestionDatetimeField">Fecha sugerida</label>
                <input type="datetime-local" name="suggestion_datetime" id="suggestionDatetimeField" min={new Date().toISOString()} />
                { errors.suggestion_datetime ? <p style={{ color: 'red' }}>{errors.suggestion_datetime[0]}</p> : null }

                <input className="button-primary" type="submit" value="Rechazar turno" />
            </fieldset>
        </form>
    )
}