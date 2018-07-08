// 2_deploy_contract.js

const AngelToken = artifacts.require("./AngelToken.sol");
var Loan = artifacts.require("Loan");

module.exports = function(deployer) {
  deployer.deploy(AngelToken);
  deployer.deploy(Loan);
};
