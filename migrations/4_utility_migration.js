var Migrations = artifacts.require("./utility.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
