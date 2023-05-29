import { useContext, useEffect, useState } from 'react'
import PetsContext from '../contexts/PetsContext'
import Modal from 'react-modal';
import PetsTable from '../components/pets/PetsTable';
import CreatePetForm from '../components/pets/CreatePetForm';
import { useNavigate } from 'react-router-dom'


function PetListPage() {
    const navigate = useNavigate();

    const { petsLoading, listPets, petList, createPet, createPetError, petDetail } = useContext(PetsContext)

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        listPets()
    }, [])

    function onSubmit(data) {
        createPet(data)
    
        if (!Object.keys(createPetError).length) {
          closeModal()
    
          listPets()
        }
    }

    if (petsLoading) {
        return <p>cargando...</p>
    }

    return (
        <>
            <div className='float-right'>
                <button className='button' onClick={ openModal }>Agregar mascota</button>
            </div>

            <PetsTable pets={petList} />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <CreatePetForm onSubmit={ onSubmit } createPetError={ createPetError }/>
            </Modal>
        </>
    )
}

export default PetListPage