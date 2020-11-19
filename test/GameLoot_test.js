/* eslint-disable no-unused-expressions */
const { contract, accounts } = require('@openzeppelin/test-environment');
const { BN, singletons, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const GameLoot = contract.fromArtifact('GameLoot');

describe('GameLoot', function () {
  const [owner, dev, user1, user2] = accounts;
  const NAME = 'GameLoot';
  const SYMBOL = 'LOOT';
  const loot1 = { name: 'Mercurial krys', lootType: new BN(0), attk: new BN(15), def: new BN(0) };
  const loot2 = { name: 'Aegis', lootType: new BN(1), attk: new BN(0), def: new BN(15) };
  const loot3 = { name: 'Excalibur', lootType: new BN(0), attk: new BN(30), def: new BN(5) };
  const loot4 = { name: 'Helm of darkness', lootType: new BN(1), attk: new BN(4), def: new BN(45) };
  beforeEach(async function () {
    this.gameloot = await GameLoot.new(owner, { from: dev });
  });
  it('has name', async function () {
    expect(await this.gameloot.name()).to.equal(NAME);
  });
  it('has symbol', async function () {
    expect(await this.gameloot.symbol()).to.equal(SYMBOL);
  });
  it('has owner', async function () {
    expect(await this.gameloot.owner()).to.equal(owner);
  });
  it('mints NFT to user by calling loot()', async function () {
    await this.gameloot.loot(user1, loot1, { from: owner });
    await this.gameloot.loot(user2, loot2, { from: owner });
    await this.gameloot.loot(user1, loot3, { from: owner });
    await this.gameloot.loot(user1, loot4, { from: owner });
    expect(await this.gameloot.balanceOf(user1), 'user1 wrong balance').to.be.a.bignumber.equal(new BN(3));
    expect(await this.gameloot.balanceOf(user2), 'user2 wrong balance').to.be.a.bignumber.equal(new BN(1));
    const balanceOfUser1 = await this.gameloot.balanceOf(user1);
    const ids = [];
    for (let i = 0; i < balanceOfUser1; ++i) {
      ids.push(await this.gameloot.tokenOfOwnerByIndex(user1, i));
    }
    for (let i = 0; i < balanceOfUser1; ++i) {
      expect(await this.gameloot.ownerOf(ids[i])).to.equal(user1);
    }
    expect(await this.gameloot.ownerOf(2)).to.equal(user2);
  });
  it('reverts if loot() not called by owner', async function () {
    await expectRevert(this.gameloot.loot(user1, loot1, { from: dev }), 'Ownable: caller is not the owner');
  });
});
