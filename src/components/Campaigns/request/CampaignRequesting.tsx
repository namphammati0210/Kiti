import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardTable from "../../Cards/CardTable";

import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

const tableHeaders = [
  "ID",
  "Description",
  "Amount (ETH)",
  "Recipient",
  "Approval Count",
  "Approve",
  "Finalize",
];

const CampaignRequesting = () => {
  const { campaignId } = useParams();
  const [requests, setRequests] = useState<any>();
  const [requestCount, setRequestCount] = useState();
  const [approversCount, setApproversCount] = useState();
  console.log(
    "🚀 ~ file: CampaignRequesting.tsx:23 ~ CampaignRequesting ~ approversCount",
    approversCount
  );

  const fetchRequests = async () => {
    try {
      const campaign = Campaign(campaignId);
      const requestCount = await campaign.methods.getRequestsCount().call();
      const approversCount = await campaign.methods.approversCount().call();

      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill("")
          .map((_, index) => {
            return campaign.methods.requests(index).call();
          })
      );
      console.log(
        "🚀 ~ file: CampaignRequesting.tsx:22 ~ fetchRequests ~ requests",
        requests
      );

      setRequestCount(requestCount);
      setRequests(requests);
      setApproversCount(approversCount);
    } catch (error) {
      console.log(
        "🚀 ~ file: CampaignRequesting.tsx:16 ~ fetchRequests ~ error",
        error
      );
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <div className="p-4">
        <button
          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
        >
          <Link to={`/app/campaign/${campaignId}/requests/new`}>
            Create a new request
          </Link>
        </button>
      </div>

      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {requests && approversCount && campaignId && (
            <CardTable
              headers={tableHeaders}
              data={requests}
              approversCount={approversCount}
              address={campaignId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignRequesting;
