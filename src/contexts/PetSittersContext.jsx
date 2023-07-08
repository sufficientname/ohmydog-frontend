import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000/users-api";

const PetSittersContext = createContext({
  petSittersLoading: true,
  petSitterList: [],
  petSitterDetail: {},
  listPetSitters: () => {},
  retrievePetSitter: () => {},
  contactPetSitter: () => {},
  createPetSitterError: {},
});

export const PetSittersContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [petSitterList, setPetSitterList] = useState([]);
  const [petSitterDetail, setPetSitterDetail] = useState({});
  const [createPetSitterError, setCreatePetSitterError] = useState({});

  const listPetSittersHandler = async (params = {}) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/petsitters/`, { auth: getBasicAuth(), params: params })
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

  const contactPetSitterHandler = async (petSitterData, contactData) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/petsitters/${petSitterData.id}/contact/`, contactData, {
        auth: getBasicAuth(),
      })
      .then((res) => {
        setCreatePetSitterError({});
        setPetSitterDetail(res.data);
      })
      .catch((err) => {
        setCreatePetSitterError(err.response.data);
        console.log("error contacting petSitter", err.response);
      });
    setIsLoading(false);
  };

  return (
    <PetSittersContext.Provider
      value={{
        petSittersLoading: isLoading,
        petSitterList: petSitterList,
        petSitterDetail: petSitterDetail,
        listPetSitters: listPetSittersHandler,
        retrievePetSitter: retrievePetSitterHandler,
        contactPetSitter: contactPetSitterHandler,
        createPetSitterError: createPetSitterError,
      }}
    >
      {props.children}
    </PetSittersContext.Provider>
  );
};

export default PetSittersContext;
