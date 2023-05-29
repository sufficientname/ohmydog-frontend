import { useContext, useState } from 'react'
import UsersAdminContext from '../contexts/UsersAdminContext'


function UserListAdminPage() {
  const { createUser, createUserError } = useContext(UsersAdminContext)
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onSubmit(data) {
    createUser(data)
  }

  return (
    <>
        {/* <div className='float-right'>
            <button className='button' onClick={ openModal }>Agregar cliente</button>
        </div>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
        >

        <CreateUserForm onSubmit={ onSubmit } errors={ createUserError } />
      </Modal> */}
    </>
  )
}

export default UserListAdminPage