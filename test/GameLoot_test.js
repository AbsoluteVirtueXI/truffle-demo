/* eslint-disable no-unused-expressions */
const { contract, accounts } = require('@openzeppelin/test-environment');
const { BN, singletons } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const GameLoot = contract.fromArtifact('GameLoot');

describe('GameLoot', function () {
  const [owner, dev, user1, user2] = accounts;
  const NAME = 'GameLoot';
  const SYMBOL = 'LOOT';
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
});
