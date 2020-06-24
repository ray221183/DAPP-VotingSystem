var Migrations = artifacts.require("_final");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
