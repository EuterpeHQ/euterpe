// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IYouTubeStreamsAggregator {
    function decimals() external view returns (uint8);

    function description() external view returns (string memory);

    function version() external view returns (uint256);

    function updateArtistStreamsBatch(
        string[] calldata artistIdentifiers,
        uint256[] calldata streamCounts
    ) external;

    function getArtistStreams(
        string calldata artistIdentifier
    ) external view returns (uint256 streams, uint256 updatedAt);
}
