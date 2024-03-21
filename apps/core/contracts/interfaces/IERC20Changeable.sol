// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20Changeable {
    event NameChanged(string name);

    event SymbolChanged(string symbol);

    function setName(string memory name_) external;

    function setSymbol(string memory symbol_) external;
}
