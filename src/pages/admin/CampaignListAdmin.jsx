import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Table from "../../components/table";
import CampaignsAdminContext from "../../contexts/CampaignsAdminContext";

export default function CampaignListAdminPage() {
  const navigate = useNavigate();

  const { campaignsLoading, listCampaigns, campaignList } = useContext(
    CampaignsAdminContext
  );

  const [step, setStep] = useState(0);

  useEffect(() => {
    listCampaigns({ status: "PUB" });
  }, []);

  function onClickCreateCampaign(event) {
    navigate("/admin/campaigns/create");
  }

  function onClickPublishedCampaigns(event) {
    setStep(0);
    listCampaigns({ status: "PUB" });
  }

  function onClickCompletedCampaigns(event) {
    setStep(1);
    listCampaigns({ status: "COM" });
  }

  function onClickAllCampaigns(event) {
    setStep(2);
    listCampaigns();
  }

  return (
    <>
      <h1>Campañas de recaudacion</h1>

      <div className="row">
        <div className="column"></div>
        <div className="column"></div>

        <div className="column">
          <button className="button container" onClick={onClickCreateCampaign}>
            Publicar campaña
          </button>
        </div>
      </div>

      <hr></hr>

      <div className="row">
        <div className="column">
          <button
            className="button container"
            onClick={onClickPublishedCampaigns}
          >
            En curso
          </button>
        </div>

        <div className="column">
          <button
            className="button container"
            onClick={onClickCompletedCampaigns}
          >
            Finalizadas
          </button>
        </div>

        <div className="column">
          <button className="button container" onClick={onClickAllCampaigns}>
            Todas
          </button>
        </div>
      </div>

      <Table
        headers={[
          { key: "name", label: "Nombre" },
          { key: "status", label: "Estado" },
          // { key: "goal_amount", label: "Monto objetivo" },
          { key: "current_amount", label: "Monto recaudado" },
          {
            key: "start_date",
            label: "Fecha de inicio",
            wrapper: (value, campaign) => value.split("T")[0],
          },
          {
            key: "end_date",
            label: "Fecha de fin",
            wrapper: (value, campaign) => value.split("T")[0],
          },
          {
            wrapper: (value, campaign) => (
              <Link to={`/admin/campaigns/${campaign.id}`}>Ver detalle</Link>
            ),
          },
        ]}
        data={campaignList}
        loading={campaignsLoading}
      />
    </>
  );
}
