var Migrations = artifacts.require("system_process");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
