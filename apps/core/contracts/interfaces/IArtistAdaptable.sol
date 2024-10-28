// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IArtistAdaptable {
    function artist() external view returns (string memory);

    function setArtist(string memory artist) external;

    function spotify() external view returns (string memory);

    function setSpotify(string memory spotify) external;
}
