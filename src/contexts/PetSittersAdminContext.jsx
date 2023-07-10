import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000/admin-api";

const PetSittersAdminContext = createContext({
  petSittersLoading: true,
  petSitterList: [],
  petSitterDetail: {},
  listPetSitters: () => {},
  retrievePetSitter: () => {},
  createPetSitter: () => {},
  cancelPetSitter: () => {},
  completePetSitter: () => {},
  createPetSitterError: {},
});

export const PetSittersAdminContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [petSitterList, setPetSitterList] = useState([]);
  const [petSitterDetail, setPetSitterDetail] = useState({});
  const [createPetSitterError, setCreatePetSitterError] = useState({});

  const listPetSittersHandler = async (params = {}) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/petsitters/`, {
        auth: getBasicAuth(),
        params: params,
        paramsSerializer: { indexes: null },
      })
      .then((res) => {
        setPetSitterList(res.data);
      })
      .catch((err) => {
        setPetSitterList([]);
        console.log("error listing petSitters", err.response);
      });
    setIsLoading(false);
  };

  const retrievePetSitterHandler = async (petSitterId) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/petsitters/${petSitterId}`, { auth: getBasicAuth() })
      .then((res) => {
        setPetSitterDetail(res.data);
      })
      .catch((err) => {
        setPetSitterDetail({});
        console.log("error retrieving petSitter", err.response);
      });
    setIsLoading(false);
  };

  const createPetSitterHandler = async (petSitterData, onCreate) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/petsitters/`, petSitterData, { auth: getBasicAuth() })
      .then((res) => {
        setPetSitterDetail(res.data);
        setCreatePetSitterError({});
        if (onCreate) {
          onCreate(res.data);
        }
      })
      .catch((err) => {
        setCreatePetSitterError(err.response.data);
        console.log("error creating petSitter", err.response);
      });
    setIsLoading(false);
  };

  const cancelPetSitterHandler = async (petSitterData) => {
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/petsitters/${petSitterData.id}/cancel/`,
        {},
        { auth: getBasicAuth() }
      )
      .then((res) => {
        setPetSitterDetail(res.data);
      })
      .catch((err) => {
        console.log("error canceling petSitter", err.response);
      });
    setIsLoading(false);
  };

  const completePetSitterHandler = async (petSitterData) => {
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/petsitters/${petSitterData.id}/complete/`,
        {},
        { auth: getBasicAuth() }
      )
      .then((res) => {
        setPetSitterDetail(res.data);
      })
      .catch((err) => {
        console.log("error completing petSitter", err.response);
      });
    setIsLoading(false);
  };

  return (
    <PetSittersAdminContext.Provider
      value={{
        petSittersLoading: isLoading,
        petSitterList: petSitterList,
        petSitterDetail: petSitterDetail,
        listPetSitters: listPetSittersHandler,
        retrievePetSitter: retrievePetSitterHandler,
        createPetSitter: createPetSitterHandler,
        cancelPetSitter: cancelPetSitterHandler,
        completePetSitter: completePetSitterHandler,
        createPetSitterError: createPetSitterError,
      }}
    >
      {props.children}
    </PetSittersAdminContext.Provider>
  );
};

export default PetSittersAdminContext;
