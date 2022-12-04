import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import web3 from "../../ethereum/web3";

import Campaign from "../../ethereum/campaign";

/* Import components */
import CardStats from "../Cards/CardStats";

interface ICampaignSummary {
  minimumContribution: string; // => minimum contribution
  balance: string; // => balance of campaign
  requestsCount: string; // => number of requests
  approversCount: string; // => number of approvers
  manager: string; // => manager's address
}

const CampaignsDetails = () => {
  const { campaignId } = useParams();
  const [campaignSummary, setCampaignSummary] = useState<ICampaignSummary>();
  const [error, setError] = useState<any>(null);

  const fetchCampaignDetails = async () => {
    try {
      const campaign = Campaign(campaignId);

      const summary = await campaign.methods.getSummary().call();

      setCampaignSummary({
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
      });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchCampaignDetails();
  }, []);

  const renderCampaignDetails = () => {
    if (campaignSummary) {
      const { minimumContribution, balance, requestsCount, approversCount } =
        campaignSummary;

      return (
        <div className="flex flex-wrap ">
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="MINIMUM CONTRIBUTION (WEI)"
              statTitle={`${minimumContribution} Wei`}
              statArrow="up"
              statPercent="3.48"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last month"
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="BALANCE (ETH)"
              statTitle={`${web3.utils.fromWei(balance, "ether")} ETH`}
              statArrow="down"
              statPercent="3.48"
              statPercentColor="text-red-500"
              statDescripiron="Since last week"
              statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500"
            />
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="NUMBER OF REQUESTS"
              statTitle={requestsCount}
              statArrow="down"
              statPercent="1.10"
              statPercentColor="text-orange-500"
              statDescripiron="Since yesterday"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="NUMBER OF APPROVERS"
              statTitle={approversCount}
              statArrow="up"
              statPercent="12"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last month"
              statIconName="fas fa-percent"
              statIconColor="bg-lightBlue-500"
            />
          </div>
          {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <CardStats
              statSubtitle="MANAGER'S ADDRESS"
              statTitle={campaignSummary[4]}
              statArrow="up"
              statPercent="12"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last month"
              statIconName="fas fa-percent"
              statIconColor="bg-lightBlue-500"
            />
          </div> */}
        </div>
      );
    }
  };

  return <div>{error ? <p>{error}</p> : renderCampaignDetails()}</div>;
};

export default CampaignsDetails;
