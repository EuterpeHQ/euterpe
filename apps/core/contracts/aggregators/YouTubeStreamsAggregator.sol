// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IYouTubeStreamsAggregator.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YouTubeStreamsAggregator is IYouTubeStreamsAggregator, Ownable {
    uint8 private _decimals = 0;
    string private _description = "YouTube Streams Aggregator";
    uint256 private _version = 0;

    struct ArtistData {
        uint256 streams;
        uint256 updatedAt;
    }

    mapping(string => ArtistData) private _artistData;

    constructor() Ownable(msg.sender) {}

    function decimals() external view override returns (uint8) {
        return _decimals;
    }

    function description() external view override returns (string memory) {
        return _description;
    }

    function version() external view override returns (uint256) {
        return _version;
    }

    function updateArtistStreamsBatch(
        string[] calldata artistIdentifiers,
        uint256[] calldata streamCounts
    ) external override onlyOwner {
        require(
            artistIdentifiers.length == streamCounts.length,
            "Array lengths must match."
        );

        for (uint i = 0; i < artistIdentifiers.length; i++) {
            _artistData[artistIdentifiers[i]] = ArtistData({
                streams: streamCounts[i],
                updatedAt: block.timestamp
            });
        }
    }

    function getArtistStreams(
        string calldata artistIdentifier
    ) external view override returns (uint256 streams, uint256 updatedAt) {
        require(
            _artistData[artistIdentifier].updatedAt != 0,
            "No data present for this artist."
        );

        ArtistData memory data = _artistData[artistIdentifier];
        return (data.streams, data.updatedAt);
    }
}
