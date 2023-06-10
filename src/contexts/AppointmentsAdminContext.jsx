import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000/admin-api";

const AppointmentsAdminContext = createContext({
  appointmentsLoading: true,
  appointmentList: [],
  appointmentDetail: {},
  listAppointments: () => {},
  retrieveAppointment: () => {},
  acceptAppointment: () => {},
  acceptAppointmentError: {},
  rejectAppointment: () => {},
  rejectAppointmentError: {},
  completeAppointment: () => {},
  completeAppointmentError: {},
});

export const AppointmentsAdminContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentList, setAppointmentList] = useState([]);
  const [appointmentDetail, setAppointmentDetail] = useState({});
  const [acceptAppointmentError, setAcceptAppointmentError] = useState({});
  const [rejectAppointmentError, setRejectAppointmentError] = useState({});
  const [completeAppointmentError, setCompleteAppointmentError] = useState({});

  const listAppointmentsHandler = async (params = {}) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/appointments/`, { auth: getBasicAuth(), params: params })
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

  const acceptAppointmentHandler = async (appointmentData, data) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/appointments/${appointmentData.id}/accept/`, data, {
        auth: getBasicAuth(),
      })
      .then((res) => {
        setAppointmentDetail(res.data);
      })
      .catch((err) => {
        setAcceptAppointmentError(err.response.data);
        console.log("error accepting appointment", err.response);
      });
    setIsLoading(false);
  };

  const rejectAppointmentHandler = async (appointmentData, data) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/appointments/${appointmentData.id}/reject/`, data, {
        auth: getBasicAuth(),
      })
      .then((res) => {
        setAppointmentDetail(res.data);
      })
      .catch((err) => {
        setRejectAppointmentError(err.response.data);
        console.log("error rejecting appointment", err.response);
      });
    setIsLoading(false);
  };

  const completeAppointmentHandler = async (appointmentData, data) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/appointments/${appointmentData.id}/complete/`, data, {
        auth: getBasicAuth(),
      })
      .then((res) => {
        setAppointmentDetail(res.data);
      })
      .catch((err) => {
        setCompleteAppointmentError(err.response.data);
        console.log("error completing appointment", err.response);
      });
    setIsLoading(false);
  };

  return (
    <AppointmentsAdminContext.Provider
      value={{
        appointmentsLoading: isLoading,
        appointmentList: appointmentList,
        appointmentDetail: appointmentDetail,
        listAppointments: listAppointmentsHandler,
        retrieveAppointment: retrieveAppointmentHandler,
        acceptAppointment: acceptAppointmentHandler,
        acceptAppointmentError: acceptAppointmentError,
        rejectAppointment: rejectAppointmentHandler,
        rejectAppointmentError: rejectAppointmentError,
        completeAppointment: completeAppointmentHandler,
        completeAppointmentError: completeAppointmentError,
      }}
    >
      {props.children}
    </AppointmentsAdminContext.Provider>
  );
};

export default AppointmentsAdminContext;
