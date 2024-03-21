// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IHarmonyV0 {
    function getFirstPurchaseTimestamp(
        address user,
        uint256 tokenId
    ) external view returns (uint256);
}
