/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
const { contract, accounts } = require('@openzeppelin/test-environment');
const { BN, singletons, expectRevert } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { expect } = require('chai');

const GameLoot = contract.fromArtifact('GameLoot');
const isSameLoot = (_loot1, loot1) => {
  return (
    _loot1 === loot1[0] &&
    new BN(_loot1[1]).eq(loot1[1]) &&
    new BN(_loot1[2]).eq(loot1[2]) &&
    new BN(_loot1[3]).eq(loot1[3])
  );
};

describe('GameLoot', function () {
  const [owner, dev, user1, user2] = accounts;
  const NAME = 'GameLoot';
  const SYMBOL = 'LOOT';
  // A VERIFIER SI UPDATE POUR STRUCT
  const loot1 = ['Mercurial krys', new BN(0), new BN(15), new BN(0)];
  const loot2 = ['Aegis', new BN(1), new BN(0), new BN(15)];
  const loot3 = ['Excalibur', new BN(0), new BN(30), new BN(5)];
  const loot4 = ['Helm of darkness', new BN(1), new BN(4), new BN(45)];

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
  it('reverts if loot() not called by owner', async function () {
    await expectRevert(this.gameloot.loot(user1, loot1, { from: dev }), 'Ownable: caller is not the owner');
  });

  it('increments tokenId by calling loot()', async function () {
    await this.gameloot.loot(user1, loot1, { from: owner });
    expect(await this.gameloot.tokenOfOwnerByIndex(user1, new BN(0)), 'id should be 1').to.be.bignumber.equal(
      new BN(1)
    );
    await this.gameloot.loot(user1, loot2, { from: owner });
    expect(await this.gameloot.tokenOfOwnerByIndex(user1, new BN(1)), 'id should be 2').to.be.bignumber.equal(
      new BN(2)
    );
  });

  it('set tokenId to loot', async function () {
    await this.gameloot.loot(user1, loot1, { from: owner });
    await this.gameloot.loot(user1, loot2, { from: owner });
    const _loot1 = await this.gameloot.getLootById(new BN(1));
    const _loot2 = await this.gameloot.getLootById(new BN(2));
    expect(isSameLoot(_loot1, loot1)).to.be.true;
    expect(isSameLoot(_loot2, loot2)).to.be.true;
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
});
