import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PetsContext from '../contexts/PetsContext'


export default function CreatePetForm() {
    const navigate = useNavigate()
    const { createPet, createPetError } = useContext(PetsContext)

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const data = new FormData(event.currentTarget);
        const values = Object.fromEntries(data.entries());
    
        console.log('submitting pet', values);
        
        createPet(values).then((res)=> {
            navigate("/pets");
        })
    }

    return (
        <form onSubmit={ handleSubmit }>

            <fieldset>
                { createPetError.non_field_errors ? <p style={{color: 'red'}}>{ createPetError.non_field_errors[0] }</p> : null }
                
                <label htmlFor="nameField">Nombre</label>
                <input type="text" name="name" id="nameField" />
                { createPetError.name ? <p style={{color: 'red'}}>{ createPetError.name[0] }</p> : null }
            
                <label htmlFor="breedField">Raza</label>
                <input type="text" name="breed" id="breedField" />
                { createPetError.breed ? <p style={{color: 'red'}}>{ createPetError.breed[0] }</p> : null }

                <label htmlFor="colorField">Color</label>
                <input type="text" name="color" id="colorField" />
                { createPetError.color ? <p style={{color: 'red'}}>{ createPetError.color[0] }</p> : null }

                <label htmlFor="birthdateField">Fecha de nacimiento</label>
                <input type="date" name="birthdate" id="birthdateField" min={ new Date().toISOString().split('T')[0] } />
                { createPetError.birthdate ? <p style={{color: 'red'}}>{ createPetError.birthdate[0] }</p> : null }

                <input className="button-primary" type="submit" value="Agregar"/>
            
            </fieldset>
        </form>
    )
}