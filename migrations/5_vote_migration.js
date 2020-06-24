var Migrations = artifacts.require("./vote.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
