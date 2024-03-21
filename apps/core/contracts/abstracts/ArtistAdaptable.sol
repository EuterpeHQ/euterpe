// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IArtistAdaptable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract ArtistAdaptable is IArtistAdaptable, Ownable {
    string private _artist;
    string private _spotify;

    constructor(string memory artist_, string memory spotify_) {
        _artist = artist_;
        _spotify = spotify_;
    }

    function artist() external view returns (string memory) {
        return _artist;
    }

    function setArtist(string memory artist_) external onlyOwner {
        _artist = artist_;
    }

    function spotify() external view returns (string memory) {
        return _spotify;
    }

    function setSpotify(string memory spotify_) external onlyOwner {
        _spotify = spotify_;
    }

    function score() internal view returns (uint256) {}
}
