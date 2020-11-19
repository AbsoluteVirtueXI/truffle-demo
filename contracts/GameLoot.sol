// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameLoot is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    enum LootType {Weapon, Armor}

    struct Loot {
        string name;
        LootType lootType;
        uint256 attk;
        uint256 def;
    }

    // 0 = weapong, 1 = armure

    constructor(address owner) public ERC721("GameLoot", "LOOT") {
        transferOwnership(owner);
    }

    // {name: 'Mercurial krys', lootType: new BN(0), attk: new BN(15), def: new BN(0)}

    //function loot(address player, Loot memory _loot) public onlyOwner returns (uint256) {}

    /*
    function awardItem(address player, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
    */
}
