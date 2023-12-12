// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MTK {
    string public name = "Monster Token";
    string public symbol = "MTK";
    address public owner;
    uint256 public totalSupply = 1000000000;
    mapping(address => uint256) balances;

    constructor() {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }
}