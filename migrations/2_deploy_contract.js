// 2_deploy_contract.js

const AngelToken = artifacts.require("./AngelToken.sol");
var Loan = artifacts.require("Loan");

module.exports = function(deployer) {
  deployer.deploy(AngelToken);
  deployer.deploy(Loan);
};

// const AngelHackCrowdsale = artifacts.require('./AngelHackCrowdsale.sol');
// const AngelHack = artifacts.require('./AngelHack.sol');

// module.exports = function (deployer, network, accounts) {
//   const openingTime = web3.eth.getBlock('latest').timestamp + 2; // two secs in the future
//   const closingTime = openingTime + 86400 * 20; // 20 days
//   const rate = new web3.BigNumber(1000);
//   const wallet = accounts[1];

//   return deployer
//     .then(() => {
//       return deployer.deploy(AngelHack);
//     })
//     .then(() => {
//       return deployer.deploy(
//         AngelHackCrowdsale,
//         openingTime,
//         closingTime,
//         rate,
//         wallet,
//         AngelHack.address
//       );
//     });
// };