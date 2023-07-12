import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import CampaignsContext from "../../contexts/CampaignsContext";
import AuthContext from "../../contexts/AuthContext";
import CampaignDonateForm from "../../components/campaigns/CampaignDonateForm";

export default function CampaignDetailPublicPage() {
  const params = useParams();
  const {
    campaignsLoading,
    campaignDetail,
    retrieveCampaign,
    donateCampaign,
    createCampaignError,
  } = useContext(CampaignsContext);

  const { userDetail } = useContext(AuthContext);

  useEffect(() => {
    retrieveCampaign(params.campaignId);
  }, []);

  function onSubmitDonateCampaign(contactData) {
    donateCampaign(campaignDetail, contactData);
  }

  return (
    <>
      <h1>Anuncio de paseador o cuidador</h1>

      <Loader loading={campaignsLoading}>
        <hr></hr>

        <div>
          <p>Nombre: {campaignDetail.name}</p>
          <p>Descripcion: {campaignDetail.description}</p>
          <p>Fecha de inicio: {campaignDetail.start_date}</p>
          <p>Fecha de fin: {campaignDetail.end_date}</p>
          {/* <p>Monto objetivo: {campaignDetail.goal_amount}</p> */}
          <p>Monto recaudado: {campaignDetail.current_amount}</p>
          <p>Estado: {campaignDetail.status}</p>
        </div>

        {campaignDetail.can_donate ? (
          <>
            <hr></hr>
            <h2>Donar</h2>
            <CampaignDonateForm
              onSubmit={onSubmitDonateCampaign}
              errors={createCampaignError}
              customer={userDetail}
            />
          </>
        ) : null}
      </Loader>
    </>
  );
}
