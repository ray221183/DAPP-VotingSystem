var VoterAccount = artifacts.require("VoterAccount");

module.exports = function(deployer) {
  deployer.deploy(VoterAccount);
};
