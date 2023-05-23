


function LoginForm(loginError, onSubmit) {
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
                <label htmlFor="usernameField">Email</label>
                <input type="email" name="username" id="usernameField" />
                {loginError.username ? <p style={{ color: 'red' }}>{loginError.username[0]}</p> : null}

                <label htmlFor="passwordField">Contraseña</label>
                <input type="password" name="password" id="passwordField" />
                {loginError.password ? <p style={{ color: 'red' }}>{loginError.password[0]}</p> : null}

                <input className="button-primary" type="submit" value="Iniciar sesion" />
            </fieldset>
        </form>
    )
}


export default function LoginPage() {

    return (
        <>
            <LoginForm loginError={{}} onSubmit={() => { }} />
        </>
    )
}