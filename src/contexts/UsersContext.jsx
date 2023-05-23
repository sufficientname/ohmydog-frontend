import axios from 'axios';
import { createContext, useState } from 'react'

const baseUrl = 'http://localhost:8000'
const basicauth = { auth: { username: 'user1@mail.com', password: 'user1' } }

const UsersContext = createContext({
    usersLoading: true,
    userDetail: {},
    retrieveUser: () => {},
})

export const UsersContextProvider = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userDetail, setUserDetail] = useState({})

    const retrieveUserHandler = async () => {
        setIsLoading(true)
        await axios
            .get(`${baseUrl}/users-api/users/me/`, basicauth)
            .then((res) => {
                setUserDetail(res.data)
            })
            .catch((err) => {
                setUserDetail({})
                console.log('error retrieving user', err.response)
            })
        setIsLoading(false)
    }

    return (
        <PetsContext.Provider
            value={{
                usersLoading: isLoading,
                userDetail: userDetail,
                retrieveUser: retrieveUserHandler
            }}
        >
            {props.children}
        </PetsContext.Provider>
    )
}

export default UsersContext
