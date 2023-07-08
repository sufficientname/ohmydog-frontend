import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000/users-api";

const PetSearchesContext = createContext({
  petSearchesLoading: true,
  petSearchList: [],
  petSearchDetail: {},
  listPetSearches: () => {},
  retrievePetSearch: () => {},
  createPetSearch: () => {},
  cancelPetSearch: () => {},
  completePetSearch: () => {},
  contactPetSearch: () => {},
  createPetSearchError: {},
});

export const PetSearchesContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [petSearchList, setPetSearchList] = useState([]);
  const [petSearchDetail, setPetSearchDetail] = useState({});
  const [createPetSearchError, setCreatePetSearchError] = useState({});

  const listPetSearchesHandler = async (params = {}) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/petsearches/`, { auth: getBasicAuth(), params: params })
      .then((res) => {
        setPetSearchList(res.data);
      })
      .catch((err) => {
        setPetSearchList([]);
        console.log("error listing petSearches", err.response);
      });
    setIsLoading(false);
  };

  const retrievePetSearchHandler = async (petSearchId) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/petsearches/${petSearchId}`, { auth: getBasicAuth() })
      .then((res) => {
        setPetSearchDetail(res.data);
      })
      .catch((err) => {
        setPetSearchDetail({});
        console.log("error retrieving petSearch", err.response);
      });
    setIsLoading(false);
  };

  const createPetSearchHandler = async (petSearchData, onCreate) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/petsearches/`, petSearchData, { auth: getBasicAuth() })
      .then((res) => {
        setPetSearchDetail(res.data);
        setCreatePetSearchError({});
        if (onCreate) {
          onCreate(res.data);
        }
      })
      .catch((err) => {
        setCreatePetSearchError(err.response.data);
        console.log("error creating petSearch", err.response);
      });
    setIsLoading(false);
  };

  const cancelPetSearchHandler = async (petSearchData) => {
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/petsearches/${petSearchData.id}/cancel/`,
        {},
        { auth: getBasicAuth() }
      )
      .then((res) => {
        setPetSearchDetail(res.data);
      })
      .catch((err) => {
        console.log("error canceling petSearch", err.response);
      });
    setIsLoading(false);
  };

  const completePetSearchHandler = async (petSearchData) => {
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/petsearches/${petSearchData.id}/complete/`,
        {},
        { auth: getBasicAuth() }
      )
      .then((res) => {
        setPetSearchDetail(res.data);
      })
      .catch((err) => {
        console.log("error completing petSearch", err.response);
      });
    setIsLoading(false);
  };

  const contactPetSearchHandler = async (petSearchData, contactData) => {
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/petsearches/${petSearchData.id}/contact/`,
        contactData,
        {
          auth: getBasicAuth(),
        }
      )
      .then((res) => {
        setCreatePetSearchError({});
        setPetSearchDetail(res.data);
      })
      .catch((err) => {
        setCreatePetSearchError(err.response.data);
        console.log("error contacting petSearch", err.response);
      });
    setIsLoading(false);
  };

  return (
    <PetSearchesContext.Provider
      value={{
        petSearchesLoading: isLoading,
        petSearchList: petSearchList,
        petSearchDetail: petSearchDetail,
        listPetSearches: listPetSearchesHandler,
        retrievePetSearch: retrievePetSearchHandler,
        createPetSearch: createPetSearchHandler,
        cancelPetSearch: cancelPetSearchHandler,
        completePetSearch: completePetSearchHandler,
        contactPetSearch: contactPetSearchHandler,
        createPetSearchError: createPetSearchError,
      }}
    >
      {props.children}
    </PetSearchesContext.Provider>
  );
};

export default PetSearchesContext;
