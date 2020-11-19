const GameLoot = artifacts.require('GameLoot');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(GameLoot, accounts[0], { from: accounts[0] });
};
