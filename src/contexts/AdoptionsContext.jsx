import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000/users-api";

const AdoptionsContext = createContext({
  adoptionsLoading: true,
  adoptionList: [],
  adoptionDetail: {},
  listAdoptions: () => {},
  retrieveAdoption: () => {},
  createAdoption: () => {},
  cancelAdoption: () => {},
  completeAdoption: () => {},
  contactAdoption: () => {},
  createAdoptionError: {},
});

export const AdoptionsContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [adoptionList, setAdoptionList] = useState([]);
  const [adoptionDetail, setAdoptionDetail] = useState({});
  const [createAdoptionError, setCreateAdoptionError] = useState({});

  const listAdoptionsHandler = async (params = {}) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/adoptions/`, {
        auth: getBasicAuth(),
        params: params,
        paramsSerializer: { indexes: null },
      })
      .then((res) => {
        setAdoptionList(res.data);
      })
      .catch((err) => {
        setAdoptionList([]);
        console.log("error listing adoptions", err.response);
      });
    setIsLoading(false);
  };

  const retrieveAdoptionHandler = async (adoptionId) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/adoptions/${adoptionId}`, { auth: getBasicAuth() })
      .then((res) => {
        setAdoptionDetail(res.data);
      })
      .catch((err) => {
        setAdoptionDetail({});
        console.log("error retrieving adoption", err.response);
      });
    setIsLoading(false);
  };

  const createAdoptionHandler = async (adoptionData, onCreate) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/adoptions/`, adoptionData, { auth: getBasicAuth() })
      .then((res) => {
        setAdoptionDetail(res.data);
        setCreateAdoptionError({});
        if (onCreate) {
          onCreate(res.data);
        }
      })
      .catch((err) => {
        setCreateAdoptionError(err.response.data);
        console.log("error creating adoption", err.response);
      });
    setIsLoading(false);
  };

  const cancelAdoptionHandler = async (adoptionData) => {
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/adoptions/${adoptionData.id}/cancel/`,
        {},
        { auth: getBasicAuth() }
      )
      .then((res) => {
        setAdoptionDetail(res.data);
      })
      .catch((err) => {
        console.log("error canceling adoption", err.response);
      });
    setIsLoading(false);
  };

  const completeAdoptionHandler = async (adoptionData) => {
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/adoptions/${adoptionData.id}/complete/`,
        {},
        { auth: getBasicAuth() }
      )
      .then((res) => {
        setAdoptionDetail(res.data);
      })
      .catch((err) => {
        console.log("error completing adoption", err.response);
      });
    setIsLoading(false);
  };

  const contactAdoptionHandler = async (adoptionData, contactData) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/adoptions/${adoptionData.id}/contact/`, contactData, {
        auth: getBasicAuth(),
      })
      .then((res) => {
        setCreateAdoptionError({});
        setAdoptionDetail(res.data);
      })
      .catch((err) => {
        setCreateAdoptionError(err.response.data);
        console.log("error contacting adoption", err.response);
      });
    setIsLoading(false);
  };

  return (
    <AdoptionsContext.Provider
      value={{
        adoptionsLoading: isLoading,
        adoptionList: adoptionList,
        adoptionDetail: adoptionDetail,
        listAdoptions: listAdoptionsHandler,
        retrieveAdoption: retrieveAdoptionHandler,
        createAdoption: createAdoptionHandler,
        cancelAdoption: cancelAdoptionHandler,
        completeAdoption: completeAdoptionHandler,
        contactAdoption: contactAdoptionHandler,
        createAdoptionError: createAdoptionError,
      }}
    >
      {props.children}
    </AdoptionsContext.Provider>
  );
};

export default AdoptionsContext;
