import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000";

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
});

export const AppointmentsAdminContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentList, setAppointmentList] = useState([]);
  const [appointmentDetail, setAppointmentDetail] = useState({});
  const [acceptAppointmentError, setAcceptAppointmentError] = useState({});
  const [rejectAppointmentError, setRejectAppointmentError] = useState({});

  const listAppointmentsHandler = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/admin-api/appointments/`, getBasicAuth())
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
      .get(`${baseUrl}/admin-api/appointments/${appointmentId}`, getBasicAuth())
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
      .post(
        `${baseUrl}/admin-api/appointments/${appointmentData.id}/accept/`,
        data,
        getBasicAuth()
      )
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
      .post(
        `${baseUrl}/admin-api/appointments/${appointmentData.id}/reject/`,
        data,
        getBasicAuth()
      )
      .then((res) => {
        setAppointmentDetail(res.data);
      })
      .catch((err) => {
        setRejectAppointmentError(err.response.data);
        console.log("error rejecting appointment", err.response);
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
      }}
    >
      {props.children}
    </AppointmentsAdminContext.Provider>
  );
};

export default AppointmentsAdminContext;
