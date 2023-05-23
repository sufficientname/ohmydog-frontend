import { useContext, useEffect, useState } from 'react'
import PetsContext from '../contexts/PetsContext'
import Modal from 'react-modal';
import PetsTable from '../components/pets/PetsTable';
import CreatePetForm from '../components/pets/CreatePetForm';


function PetListPage() {
    const { petsLoading, listPets, petList, createPet, createPetError } = useContext(PetsContext)

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
                <CreatePetForm createPet={ createPet } createPetError={ createPetError }/>
            </Modal>
        </>
    )
}

export default PetListPage