// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

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

    mapping(uint256 => Loot) private _loots;

    constructor(address owner) public ERC721("GameLoot", "LOOT") {
        transferOwnership(owner);
    }

    function loot(address player, Loot memory loot_) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(player, newTokenId);
        _loots[newTokenId] = loot_;
        return newTokenId;
    }

    function getLootById(uint256 tokenId) public view returns (Loot memory) {
        return _loots[tokenId];
    }
}
