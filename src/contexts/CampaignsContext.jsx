import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000/users-api";

const CampaignsContext = createContext({
  campaignsLoading: true,
  campaignList: [],
  campaignDetail: {},
  listCampaigns: () => {},
  retrieveCampaign: () => {},
  donateCampaign: () => {},
  createCampaignError: {},
});

export const CampaignsContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaignList, setCampaignList] = useState([]);
  const [campaignDetail, setCampaignDetail] = useState({});
  const [createCampaignError, setCreateCampaignError] = useState({});

  const listCampaignsHandler = async (params = {}) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/campaigns/`, { auth: getBasicAuth(), params: params })
      .then((res) => {
        setCampaignList(res.data);
      })
      .catch((err) => {
        setCampaignList([]);
        console.log("error listing campaigns", err.response);
      });
    setIsLoading(false);
  };

  const retrieveCampaignHandler = async (campaignId) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/campaigns/${campaignId}`, { auth: getBasicAuth() })
      .then((res) => {
        setCampaignDetail(res.data);
      })
      .catch((err) => {
        setCampaignDetail({});
        console.log("error retrieving campaign", err.response);
      });
    setIsLoading(false);
  };

  const donateCampaignHandler = async (campaignData, donationData) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/campaigns/${campaignData.id}/donate/`, donationData, {
        auth: getBasicAuth(),
      })
      .then((res) => {
        setCreateCampaignError({});
        setCampaignDetail(res.data);
      })
      .catch((err) => {
        setCreateCampaignError(err.response.data);
        console.log("error contacting campaign", err.response);
      });
    setIsLoading(false);
  };

  return (
    <CampaignsContext.Provider
      value={{
        campaignsLoading: isLoading,
        campaignList: campaignList,
        campaignDetail: campaignDetail,
        listCampaigns: listCampaignsHandler,
        retrieveCampaign: retrieveCampaignHandler,
        donateCampaign: donateCampaignHandler,
        createCampaignError: createCampaignError,
      }}
    >
      {props.children}
    </CampaignsContext.Provider>
  );
};

export default CampaignsContext;
