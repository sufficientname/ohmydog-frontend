import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table";
import CampaignsContext from "../../contexts/CampaignsContext";

export default function CampaignListPage() {
  const { campaignsLoading, listCampaigns, campaignList } =
    useContext(CampaignsContext);

  const [step, setStep] = useState(0);

  useEffect(() => {
    listCampaigns({ status: "PUB" });
  }, []);

  function onClickPublishedCampaigns(event) {
    setStep(0);
    listCampaigns({ status: "PUB" });
  }

  function onClickCompletedCampaigns(event) {
    setStep(1);
    listCampaigns({ status: "COM" });
  }

  return (
    <>
      <h1>Campañas de recaudacion</h1>

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
      </div>

      <Table
        headers={[
          { key: "name", label: "Nombre" },
          { key: "goal_amount", label: "Monto objetivo" },
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
          { key: "status", label: "Estado" },
          {
            wrapper: (value, campaign) => (
              <Link to={`/campaigns/${campaign.id}`}>Ver detalle</Link>
            ),
          },
        ]}
        data={campaignList}
        loading={campaignsLoading}
      />
    </>
  );
}
