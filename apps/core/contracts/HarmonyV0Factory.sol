// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./HarmonyV0.sol";

contract HarmonyV0Factory {
    event HarmonyCreated(
        address indexed harmonyAddress,
        string artist,
        string spotify
    );

    address[] public artistHarmonies;

    address public EUTERPE_CONTRACT_ADDRESS;

    constructor(address euterpe) {
        EUTERPE_CONTRACT_ADDRESS = euterpe;
    }

    function createHarmony(
        string memory uri,
        string memory artist,
        string memory spotify,
        address artistToken
    ) public returns (address) {
        HarmonyV0 harmony = new HarmonyV0(
            msg.sender,
            uri,
            artist,
            spotify,
            artistToken,
            EUTERPE_CONTRACT_ADDRESS
        );

        artistHarmonies.push(address(harmony));

        emit HarmonyCreated(address(harmony), artist, spotify);

        return address(harmony);
    }

    function getHarmonyCount() public view returns (uint) {
        return artistHarmonies.length;
    }

    function getHarmonyAddress(uint index) public view returns (address) {
        require(index < artistHarmonies.length, "Index out of bounds");
        return artistHarmonies[index];
    }
}
