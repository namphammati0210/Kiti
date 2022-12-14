import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import factory from "./ethereum/factory";

/* Import components */
import CardCampaign from "./components/Cards/CardCampaign";

function App() {
  const [campaigns, setCampaigns] = useState([]);
  console.log("🚀 ~ file: App.tsx ~ line 6 ~ App ~ campaigns", campaigns);

  const fetchAllCampaigns = async () => {
    try {
      const deployedCampaigns = await factory.methods
        .getDeployedCampaigns()
        .call();

      console.log(
        "🚀 ~ file: App.tsx ~ line 13 ~ fetchAllCampaigns ~ deployedCampaigns",
        deployedCampaigns
      );

      setCampaigns(deployedCampaigns);
    } catch (error) {
      console.log(
        "🚀 ~ file: App.tsx ~ line 11 ~ fetchAllCampaigns ~ error",
        error
      );
    }
  };

  useEffect(() => {
    fetchAllCampaigns();
  }, []);

  return (
    <div>
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Campaigns</h6>
          <button
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
          >
            <Link to={"/app/campaign/new"}>Create a new Campaign</Link>
          </button>
        </div>
      </div>
      {/* <div className="flex-auto px-4 lg:px-10 py-10 pt-0"> */}
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {campaigns.length ? (
            campaigns.map((campaign) => (
              // <div>
              //   <p>{campaign}</p>
              //   <Link to={`campaign/${campaign}`}>View campaign</Link>
              // </div>

              <CardCampaign campaignName={campaign} manager={""} />
            ))
          ) : (
            <h1>Not found any campaign, Let create one</h1>
          )}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
