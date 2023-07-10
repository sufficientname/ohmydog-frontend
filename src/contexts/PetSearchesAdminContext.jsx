import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000/admin-api";

const PetSearchesAdminContext = createContext({
  petSearchesLoading: true,
  petSearchList: [],
  petSearchDetail: {},
  listPetSearches: () => {},
  retrievePetSearch: () => {},
});

export const PetSearchesAdminContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [petSearchList, setPetSearchList] = useState([]);
  const [petSearchDetail, setPetSearchDetail] = useState({});

  const listPetSearchesHandler = async (params = {}) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/petsearches/`, {
        auth: getBasicAuth(),
        params: params,
        paramsSerializer: { indexes: null },
      })
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

  return (
    <PetSearchesAdminContext.Provider
      value={{
        petSearchesLoading: isLoading,
        petSearchList: petSearchList,
        petSearchDetail: petSearchDetail,
        listPetSearches: listPetSearchesHandler,
        retrievePetSearch: retrievePetSearchHandler,
      }}
    >
      {props.children}
    </PetSearchesAdminContext.Provider>
  );
};

export default PetSearchesAdminContext;
