import React, { useState, useEffect } from "react";
import factory from "./ethereum/factory";

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

  return <h1 className="text-3xl font-bold underline">Hello world</h1>;
}

export default App;
