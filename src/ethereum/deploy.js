// require("dotenv").config();

// const HDWalletProvider = require("@truffle/hdwallet-provider");
const ganache = require("ganache-cli");
const Web3 = require("web3");
// const { interface, bytecode } = require("./compile");
const compiledFactory = require("./build/CampaignFactory.json");

// const provider = new HDWalletProvider(
//   process.env.WALLET_MNEMONIC,
//   process.env.INFURA_ENDPOINT
// );
// const web3 = new Web3(ganache.provider());
const web3 = new Web3("http://127.0.0.1:7545");

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({
      gas: "1400000",
      from: accounts[0], //0xD2f70Ff46706bEec01e484E2F779d883eedc7695
    });

  console.log("Contract deployed to", result.options.address);
  // provider.engine.stop();
};

deploy();
