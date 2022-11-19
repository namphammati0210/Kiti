require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
// const { interface, bytecode } = require("./compile");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  process.env.WALLET_MNEMONIC,
  process.env.INFURA_ENDPOINT
);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("🚀 ~ file: deploy.js ~ line 17 ~ deploy ~ accounts", accounts);

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
      .send({ from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
  } catch (error) {
    console.log("🚀 ~ file: deploy.js ~ line 27 ~ deploy ~ error", error);
  }
};

deploy();
