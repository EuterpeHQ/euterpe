// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ArtistToken.sol";

contract ArtistTokenFactory {
    event TokenCreated(
        address indexed tokenAddress,
        string artist,
        string spotify
    );

    address[] public artistTokens;

    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        string memory artist,
        string memory spotify
    ) public returns (address) {
        ArtistToken artistToken = new ArtistToken(
            msg.sender,
            name,
            symbol,
            initialSupply,
            artist,
            spotify
        );

        artistTokens.push(address(artistToken));

        emit TokenCreated(address(artistToken), artist, spotify);

        return address(artistToken);
    }

    function getTokenCount() public view returns (uint) {
        return artistTokens.length;
    }

    function getTokenAddress(uint index) public view returns (address) {
        require(index < artistTokens.length, "Index out of bounds");
        return artistTokens[index];
    }
}
