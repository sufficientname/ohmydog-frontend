import { useContext, useEffect } from 'react'
import PetsContext from '../contexts/PetsContext'
import PetsTable from '../components/pets/PetsTable';
import { useNavigate } from 'react-router-dom'


function PetListPage() {
    const navigate = useNavigate();

    const { petsLoading, listPets, petList } = useContext(PetsContext)

    useEffect(() => {
        listPets()
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/pets/create')
      }

    if (petsLoading) {
        return <p>cargando...</p>
    }

    return (
        <>
            <div className='float-right'>
                <button className='button' onClick={handleClick}>Agregar mascota</button>
            </div>

            <PetsTable pets={petList} />

            {/* <CreatePetForm onSubmit={ onSubmit } createPetError={ createPetError }/> */}
        </>
    )
}

export default PetListPage