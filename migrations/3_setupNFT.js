const GameLoot = artifacts.require('GameLoot');
const BN = web3.utils.BN;

module.exports = async function (deployer, network, accounts) {
  const gameloot = await GameLoot.deployed();
  await gameloot.loot(accounts[0], ['mercurial krys', new BN(0), new BN(10), new BN(5)], { from: accounts[0] });
};
