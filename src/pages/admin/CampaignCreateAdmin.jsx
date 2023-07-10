import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CampaignsAdminContext from "../../contexts/CampaignsAdminContext";
import CampaignCreateForm from "../../components/campaigns/CampaignCreateForm";

export default function CampaignCreateAdminPage() {
  const navigate = useNavigate();
  const { createCampaign, createCampaignError } = useContext(
    CampaignsAdminContext
  );

  function onCreate(data) {
    navigate(`/admin/campaigns/${data.id}`);
  }

  function onSubmitCreateCampaign(data) {
    createCampaign(data, onCreate);
  }

  return (
    <>
      <h1>Publicar una campaña de recaudacion</h1>

      <hr></hr>

      <CampaignCreateForm
        onSubmit={onSubmitCreateCampaign}
        errors={createCampaignError}
      />
    </>
  );
}
