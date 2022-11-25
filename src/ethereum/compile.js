const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// Reset build folder every running compile
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// Find solidity file path
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const src = fs.readFileSync(campaignPath, "utf8");

// Compile solidity file
const input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: src,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("🚀 ~ file: compile.js ~ line 31 ~ output", output);

// Create build folder if it isn't existed
fs.ensureDirSync(buildPath);

// Build json file for each contract
for (let contract in output.contracts["Campaign.sol"]) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract + ".json"),
    output.contracts["Campaign.sol"][contract]
  );
}
