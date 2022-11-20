import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x01de0364B8F5b5d68d4a1b49db5B71Ca9cbDC718"
  // "0x74d6c5f4426DfCE08e4C5019B832C7c4f13c45bE"
);

export default instance;
