import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import CampaignsAdminContext from "../../contexts/CampaignsAdminContext";
import Table from "../../components/table";

export default function CampaignDetailAdminPage() {
  const params = useParams();
  const {
    campaignsLoading,
    retrieveCampaign,
    campaignDetail,
    cancelCampaign,
    completeCampaign,
  } = useContext(CampaignsAdminContext);

  useEffect(() => {
    retrieveCampaign(params.campaignId);
  }, []);

  function onClickCancelCampaign(event) {
    cancelCampaign(campaignDetail);
  }

  function onClickCompleteCampaign(event) {
    completeCampaign(campaignDetail);
  }

  return (
    <>
      <h1>Campaña de recaudacion</h1>

      <Loader loading={campaignsLoading}>
        <div className="row">
          {campaignDetail.can_cancel ? (
            <div className="column">
              <button
                className="button container"
                onClick={onClickCancelCampaign}
              >
                Cancelar
              </button>
            </div>
          ) : null}
          {campaignDetail.can_complete ? (
            <div className="column">
              <button
                className="button container"
                onClick={onClickCompleteCampaign}
              >
                Completar
              </button>
            </div>
          ) : null}
        </div>

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

        <hr></hr>

        <h2>Donaciones</h2>
        <Table
          headers={[
            { key: "donor_first_name", label: "Nombre" },
            { key: "donor_last_name", label: "Apellido" },
            { key: "donor_email", label: "Email" },
            { key: "donor_phone_number", label: "Telefono" },
            { key: "amount", label: "Monto" },
            { key: "created_at", label: "Fecha" },
          ]}
          data={campaignDetail.donations}
        />
      </Loader>
    </>
  );
}
