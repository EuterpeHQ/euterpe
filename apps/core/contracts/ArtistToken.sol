// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "./abstracts/ERC20Changeable.sol";
import "./abstracts/ArtistAdaptable.sol";

contract ArtistToken is
    ERC20,
    ERC20Burnable,
    ERC20Pausable,
    Ownable,
    ArtistAdaptable,
    ERC20Permit,
    ERC20Changeable
{
    constructor(
        address owner,
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        string memory artist,
        string memory spotify
    )
        ERC20(name, symbol)
        Ownable(owner)
        ArtistAdaptable(artist, spotify)
        ERC20Permit(name)
    {
        _mint(owner, initialSupply * 10 ** decimals());
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}
