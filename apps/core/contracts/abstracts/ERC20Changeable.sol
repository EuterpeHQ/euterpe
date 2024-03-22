// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IERC20Changeable.sol";

abstract contract ERC20Changeable is IERC20Changeable, ERC20, Ownable {
    string private _name;
    string private _symbol;

    function setName(string memory name_) public onlyOwner {
        _name = name_;

        emit NameChanged(name_);
    }

    function setSymbol(string memory symbol_) public {
        _symbol = symbol_;

        emit SymbolChanged(symbol_);
    }
}
