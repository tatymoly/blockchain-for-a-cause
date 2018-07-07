// 2_deploy_contract.js

const AngelToken = artifacts.require("./AngelToken.sol");

module.exports = function(deployer) {
  deployer.deploy(AngelToken);
};
