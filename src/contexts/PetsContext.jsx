import axios from 'axios';
import { createContext, useState } from 'react'

const baseUrl = 'http://localhost:8000'

const basicauth = { auth: { username: 'user1@mail.com', password: 'user1' } }


const PetsContext = createContext({
    petsLoading: true,
    petList: [],
    petDetail: {},
    listPets: () => {},
    retrievePet: () => {},
    createPet: () => {},
    createPetEror: {}
})

export const PetsContextProvider = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [petList, setPetList] = useState([]);
    const [petDetail, setPetDetail] = useState({})
    const [createPetError, setCreatePetError] = useState({})

    const listPetsHandler = async () => {
        setIsLoading(true)
        await axios
            .get(`${baseUrl}/users-api/pets/`, basicauth)
            .then((res) => {
                setPetList(res.data)
            })
            .catch((err) => {
                setPetList([])
                console.log('error listing pets', err.response)
            })
        setIsLoading(false)
    }

    const retrievePetHandler = async (petId) => {
        setIsLoading(true)
        await axios
            .get(`${baseUrl}/users-api/pets/${petId}`, basicauth)
            .then((res) => {
                setPetDetail(res.data)
            })
            .catch((err) => {
                setPetDetail({})
                console.log('error retrieving pet', err.response)
            })
        setIsLoading(false)
    }

    const createPetHandler = async (petData) => {
        setIsLoading(true)
        await axios
            .post(`${baseUrl}/users-api/pets/`, petData, basicauth)
            .then((res) => {
                setPetDetail(res.data)
                setCreatePetError({})
            })
            .catch((err) => {
                setPetDetail({})
                setCreatePetError(err.response.data)
                console.log('error creating pet', err.response)
            })
        setIsLoading(false)
    }

    return (
        <PetsContext.Provider
            value={{
                petsLoading: isLoading,
                petList: petList,
                petDetail: petDetail,
                listPets: listPetsHandler,
                retrievePet: retrievePetHandler,
                createPet: createPetHandler,
                createPetError: createPetError
            }}
        >
            {props.children}
        </PetsContext.Provider>
    )
}

export default PetsContext
