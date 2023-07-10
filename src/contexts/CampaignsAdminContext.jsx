import axios from "axios";
import { createContext, useState } from "react";
import { getBasicAuth } from "../utils/auth";

const baseUrl = "http://localhost:8000/admin-api";

const CampaignsAdminContext = createContext({
  campaignsLoading: true,
  campaignList: [],
  campaignDetail: {},
  listCampaigns: () => {},
  retrieveCampaign: () => {},
  createCampaign: () => {},
  cancelCampaign: () => {},
  completeCampaign: () => {},
  createCampaignError: {},
});

export const CampaignsAdminContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaignList, setCampaignList] = useState([]);
  const [campaignDetail, setCampaignDetail] = useState({});
  const [createCampaignError, setCreateCampaignError] = useState({});

  const listCampaignsHandler = async (params = {}) => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/campaigns/`, {
        auth: getBasicAuth(),
        params: params,
        paramsSerializer: { indexes: null },
      })
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

  const createCampaignHandler = async (campaignData, onCreate) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/campaigns/`, campaignData, { auth: getBasicAuth() })
      .then((res) => {
        setCampaignDetail(res.data);
        setCreateCampaignError({});
        if (onCreate) {
          onCreate(res.data);
        }
      })
      .catch((err) => {
        setCreateCampaignError(err.response.data);
        console.log("error creating campaign", err.response);
      });
    setIsLoading(false);
  };

  const cancelCampaignHandler = async (campaignData) => {
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/campaigns/${campaignData.id}/cancel/`,
        {},
        { auth: getBasicAuth() }
      )
      .then((res) => {
        setCampaignDetail(res.data);
      })
      .catch((err) => {
        console.log("error canceling campaign", err.response);
      });
    setIsLoading(false);
  };

  const completeCampaignHandler = async (campaignData) => {
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/campaigns/${campaignData.id}/complete/`,
        {},
        { auth: getBasicAuth() }
      )
      .then((res) => {
        setCampaignDetail(res.data);
      })
      .catch((err) => {
        console.log("error completing campaign", err.response);
      });
    setIsLoading(false);
  };

  return (
    <CampaignsAdminContext.Provider
      value={{
        campaignsLoading: isLoading,
        campaignList: campaignList,
        campaignDetail: campaignDetail,
        listCampaigns: listCampaignsHandler,
        retrieveCampaign: retrieveCampaignHandler,
        createCampaign: createCampaignHandler,
        cancelCampaign: cancelCampaignHandler,
        completeCampaign: completeCampaignHandler,
        createCampaignError: createCampaignError,
      }}
    >
      {props.children}
    </CampaignsAdminContext.Provider>
  );
};

export default CampaignsAdminContext;
