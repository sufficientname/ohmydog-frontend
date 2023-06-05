import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000";

const PetsAdminContext = createContext({
  petsLoading: true,
  petList: [],
  petDetail: {},
  listPets: () => {},
  retrievePet: () => {},
  createPet: () => {},
  createPetEror: {},
});

export const PetsAdminContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [petList, setPetList] = useState([]);
  const [petDetail, setPetDetail] = useState({});
  const [createPetError, setCreatePetError] = useState({});

  const listPetsHandler = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/admin-api/pets/`, getBasicAuth())
      .then((res) => {
        setPetList(res.data);
      })
      .catch((err) => {
        setPetList([]);
        console.log("error listing pets", err.response);
      });
    setIsLoading(false);
  };

  const retrievePetHandler = async (petId) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/admin-api/pets/${petId}`, getBasicAuth())
      .then((res) => {
        setPetDetail(res.data);
      })
      .catch((err) => {
        setPetDetail({});
        console.log("error retrieving pet", err.response);
      });
    setIsLoading(false);
  };

  const createPetHandler = async (petData) => {
    await axios
      .post(`${baseUrl}/admin-api/pets/`, petData, getBasicAuth())
      .then((res) => {
        setPetDetail(res.data);
        setCreatePetError({});
      })
      .catch((err) => {
        setPetDetail({});
        setCreatePetError(err.response.data);
        console.log("error creating pet", err.response);
      });
  };

  return (
    <PetsAdminContext.Provider
      value={{
        petsLoading: isLoading,
        petList: petList,
        petDetail: petDetail,
        listPets: listPetsHandler,
        retrievePet: retrievePetHandler,
        createPet: createPetHandler,
        createPetError: createPetError,
      }}
    >
      {props.children}
    </PetsAdminContext.Provider>
  );
};

export default PetsAdminContext;
