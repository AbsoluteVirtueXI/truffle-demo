const GameLoot = artifacts.require('GameLoot');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(GameLoot, accounts[0], { from: accounts[0] });
};
