// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IHarmonyV0.sol";
import "./Interest.sol";
import "./interfaces/IYouTubeStreamsAggregator.sol";

contract EuterpeV0 is ReentrancyGuard, Interest {
    IYouTubeStreamsAggregator internal dataFeed;
    mapping(address => mapping(uint256 => uint256))
        public lastWithdrawalTimestamp;

    uint256 public constant FIFTY_ARTIST_TOKEN_YIELD_10_PERCENT_HARMONY = 0;
    uint256 public constant ONE_PERCENT_OF_YOUTUBE_VIDEO_VIEWS_REVENUE_HARMONY =
        1;

    /** Support For More Harmonies Coming In V2
     *
     * uint256 public constant ARTIST_TOKEN_YIELD_HARMONY = 2;
     * uint256 public constant STREAMS_REVENUE_HARMONY = 3;
     * uint256 public constant TICKET_SALES_REVENUE_HARMONY = 4;
     * uint256 public constant ROYALTIES_HARMONY = 5;
     * uint256 public constant TOUR_REVENUE_HARMONY = 6;
     * uint256 public constant MUSIC_RIGHTS_HARMONY = 7;
     */

    event WithdrawalMade(address indexed investor, uint256 tokenId);

    modifier onlyHarmonyOwner(uint256 tokenId, address harmonyV0) {
        require(
            IERC1155(harmonyV0).balanceOf(msg.sender, tokenId) > 0,
            "Only Harmony Owner"
        );
        _;
    }

    /**
     * Network: Arbitrum Sepolia
     * Aggregator: YouTube Streams Aggregator
     * Address: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
     */
    constructor() {
        dataFeed = IYouTubeStreamsAggregator(
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        );
    }

    function withdraw(
        address artistToken,
        address harmonyV0,
        uint256 tokenId
    ) external onlyHarmonyOwner(tokenId, harmonyV0) nonReentrant {
        uint256 lastWithdrawal = lastWithdrawalTimestamp[msg.sender][tokenId];

        if (lastWithdrawal == 0) {
            lastWithdrawal = IHarmonyV0(harmonyV0).getFirstPurchaseTimestamp(
                msg.sender,
                tokenId
            );
        }
        require(
            lastWithdrawal < block.timestamp,
            "You cannot make a withdrawal yet"
        );

        uint256 decimals = ERC20(artistToken).decimals();
        uint256 balance = IERC20(artistToken).balanceOf(msg.sender);

        if (tokenId == FIFTY_ARTIST_TOKEN_YIELD_10_PERCENT_HARMONY) {
            require(
                balance >= 50 * 10 ** decimals,
                "Insufficient artist token balance, you are not eligible"
            );

            /**
             * To know more about how yield is calculated, visit this link
             * https://github.com/wolflo/solidity-interest-helper
             */
            uint256 rate = this.yearlyRateToRay(0.05 ether /* 5% */);
            uint256 period = block.timestamp - lastWithdrawal;
            uint256 yield = this.accrueInterest(balance, rate, period);

            IERC20(artistToken).transferFrom(
                Ownable(artistToken).owner(),
                msg.sender,
                yield
            );

            lastWithdrawalTimestamp[msg.sender][
                FIFTY_ARTIST_TOKEN_YIELD_10_PERCENT_HARMONY
            ] = block.timestamp;
        } else if (
            tokenId == ONE_PERCENT_OF_YOUTUBE_VIDEO_VIEWS_REVENUE_HARMONY
        ) {
            require(
                true == false,
                "Support for YouTube video views revenue coming soon"
            );
        }

        emit WithdrawalMade(msg.sender, tokenId);
    }
}
