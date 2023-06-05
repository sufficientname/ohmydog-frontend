import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000";

const AdoptionsContext = createContext({
  adoptionsLoading: true,
  adoptionList: [],
  adoptionDetail: {},
  listAdoptions: () => {},
  retrieveAdoption: () => {},
  createAdoption: () => {},
  createAdoptionError: {},
});

export const AdoptionsContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [adoptionList, setAdoptionList] = useState([]);
  const [adoptionDetail, setAdoptionDetail] = useState({});
  const [createAdoptionError, setCreateAdoptionError] = useState({});

  const listAdoptionsHandler = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/users-api/adoptions/`)
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
      .get(`${baseUrl}/users-api/adoptions/${adoptionId}`, getBasicAuth())
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
    await axios
      .post(`${baseUrl}/users-api/adoptions/`, adoptionData, getBasicAuth())
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
        createAdoptionError: createAdoptionError,
      }}
    >
      {props.children}
    </AdoptionsContext.Provider>
  );
};

export default AdoptionsContext;
