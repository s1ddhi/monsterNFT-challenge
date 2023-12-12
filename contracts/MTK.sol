// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MTK is ERC20 {
    mapping(address => uint256) balances;

    constructor() ERC20("Monster Token", "MTK") {
        _mint(msg.sender, 1000000000);
    }
}
