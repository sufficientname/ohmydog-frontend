import axios from 'axios';
import { createContext, useState } from 'react'

const baseUrl = 'http://localhost:8000'

const basicauth = { auth: { username: 'user1@mail.com', password: 'user1' } }


const AppointmentsContext = createContext({
    appointmentsLoading: true,
    appointmentList: [],
    appointmentDetail: {},
    listAppointments: () => {},
    retrieveAppointment: () => {},
    createAppointment: () => {},
    createAppointmentError: {},
    cancelAppointment: () => {}
})

export const AppointmentsContextProvider = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [appointmentList, setAppointmentList] = useState([]);
    const [appointmentDetail, setAppointmentDetail] = useState({})
    const [createAppointmentError, setCreateAppointmentError] = useState({})

    const listAppointmentsHandler = async () => {
        setIsLoading(true)
        await axios
            .get(`${baseUrl}/users-api/appointments/`, basicauth)
            .then((res) => {
                setAppointmentList(res.data)
            })
            .catch((err) => {
                setAppointmentList(() => [])
                console.log('error listing appointments', err.response)
            })
        setIsLoading(false)
    }

    const retrieveAppointmentHandler = async (appointmentId) => {
        setIsLoading(true)
        await axios
            .get(`${baseUrl}/users-api/appointments/${appointmentId}`, basicauth)
            .then((res) => {
                setAppointmentDetail(res.data)
            })
            .catch((err) => {
                setAppointmentDetail(() => {})
                console.log('error retrieving appointment', err.response)
            })
        setIsLoading(false)
    }

    const createAppointmentHandler = async (appointmentData) => {
        setIsLoading(true)
        await axios
            .post(`${baseUrl}/users-api/appointments/`, appointmentData, basicauth)
            .then((res) => {
                setAppointmentDetail(res.data)
                setCreateAppointmentError({})
            })
            .catch((err) => {
                setAppointmentDetail(res.data)
                setCreateAppointmentError(err.response.data)
                console.log('error creating appointment', err.response)
            })
        setIsLoading(false)
    }

    const cancelAppointmentHandler = async (appointmentData) => {
        setIsLoading(true)
        await axios
            .post(`${baseUrl}/users-api/appointments/${appointmentData.id}/cancel/`, {}, basicauth)
            .then((res) => {
                setAppointmentDetail(res.data)
            })
            .catch((err) => {
                console.log('error canceling appointment', err.response)
            })
        setIsLoading(false)
    }

    return (
        <AppointmentsContext.Provider
            value={{
                appointmentsLoading: isLoading,
                appointmentList: appointmentList,
                appointmentDetail: appointmentDetail,
                listAppointments: listAppointmentsHandler,
                retrieveAppointment: retrieveAppointmentHandler,
                createAppointment: createAppointmentHandler,
                createAppointmentError: createAppointmentError,
                cancelAppointment: cancelAppointmentHandler,
            }}
        >
            {props.children}
        </AppointmentsContext.Provider>
    )

}

export default AppointmentsContext
