// import web3 from "./web3";
// import ganache from ("ganache-cli");
import Web3 from "web3";
import CampaignFactory from "./build/CampaignFactory.json";

const web3 = new Web3("http://127.0.0.1:7545");

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x9B593e6BE8caa65BBaF8C299B1aD5326862A77a6"

  // "0x74d6c5f4426DfCE08e4C5019B832C7c4f13c45bE"
);

export default instance;
