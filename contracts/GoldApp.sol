// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./GoldToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoldApp is Ownable {
    GoldToken private _gold;

    constructor(address owner) public {
        transferOwnership(owner);
    }

    function setGoldToken(address goldAddress) external onlyOwner {
        _gold = GoldToken(goldAddress);
    }

    function moveToByAdmin(
        address src,
        address dst,
        uint256 amount
    ) public onlyOwner {
        _gold.operatorSend(src, dst, amount, "", "");
    }
}
