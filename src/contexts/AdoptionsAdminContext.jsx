import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000/admin-api";

const AdoptionsAdminContext = createContext({
  adoptionsLoading: true,
  adoptionList: [],
  adoptionDetail: {},
  listAdoptions: () => {},
  retrieveAdoption: () => {},
});

export const AdoptionsAdminContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [adoptionList, setAdoptionList] = useState([]);
  const [adoptionDetail, setAdoptionDetail] = useState({});

  const listAdoptionsHandler = async (params = {}) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/adoptions/`, { auth: getBasicAuth(), params })
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

  return (
    <AdoptionsAdminContext.Provider
      value={{
        adoptionsLoading: isLoading,
        adoptionList: adoptionList,
        adoptionDetail: adoptionDetail,
        listAdoptions: listAdoptionsHandler,
        retrieveAdoption: retrieveAdoptionHandler,
      }}
    >
      {props.children}
    </AdoptionsAdminContext.Provider>
  );
};

export default AdoptionsAdminContext;
