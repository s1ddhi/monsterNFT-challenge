// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MTK {
    string public name = "Monster Token";
    string public symbol = "MTK";
    address public owner;
    constructor() {
        owner = msg.sender;
    }
}