import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000/users-api";

const AppointmentsContext = createContext({
  appointmentsLoading: true,
  appointmentList: [],
  appointmentDetail: {},
  listAppointments: () => {},
  retrieveAppointment: () => {},
  createAppointment: () => {},
  createAppointmentError: {},
  cancelAppointment: () => {},
});

export const AppointmentsContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentList, setAppointmentList] = useState([]);
  const [appointmentDetail, setAppointmentDetail] = useState({});
  const [createAppointmentError, setCreateAppointmentError] = useState({});

  const listAppointmentsHandler = async (params = {}) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/appointments/`, {
        auth: getBasicAuth(),
        params: params,
      })
      .then((res) => {
        setAppointmentList(res.data);
      })
      .catch((err) => {
        setAppointmentList([]);
        console.log("error listing appointments", err.response);
      });
    setIsLoading(false);
  };

  const retrieveAppointmentHandler = async (appointmentId) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/appointments/${appointmentId}`, { auth: getBasicAuth() })
      .then((res) => {
        setAppointmentDetail(res.data);
      })
      .catch((err) => {
        setAppointmentDetail({});
        console.log("error retrieving appointment", err.response);
      });
    setIsLoading(false);
  };

  const createAppointmentHandler = async (appointmentData, onCreate) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/appointments/`, appointmentData, {
        auth: getBasicAuth(),
      })
      .then((res) => {
        setAppointmentDetail(res.data);
        setCreateAppointmentError({});
        if (onCreate) {
          onCreate(res.data);
        }
      })
      .catch((err) => {
        setCreateAppointmentError(err.response.data);
        console.log("error creating appointment", err.response);
      });
    setIsLoading(false);
  };

  const cancelAppointmentHandler = async (appointmentData) => {
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/appointments/${appointmentData.id}/cancel/`,
        {},
        { auth: getBasicAuth() }
      )
      .then((res) => {
        setAppointmentDetail(res.data);
      })
      .catch((err) => {
        console.log("error canceling appointment", err.response);
      });
    setIsLoading(false);
  };

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
  );
};

export default AppointmentsContext;
