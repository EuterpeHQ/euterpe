// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Exchange is Ownable, ReentrancyGuard {
    address public platformToken;
    uint256 public tokenPrice;

    struct Listing {
        address seller;
        IERC20 token;
        uint256 amount;
        uint256 price;
    }

    Listing[] public listings;
    uint256 public totalListingsCount;

    constructor(
        address _platformToken,
        uint256 _tokenPrice
    ) Ownable(msg.sender) {
        platformToken = _platformToken;
        tokenPrice = _tokenPrice;
    }

    function buy() external payable nonReentrant {
        require(msg.value > 0, "Need to send ETH");
        uint256 amountToBuy = (msg.value / tokenPrice) *
            10 ** ERC20(platformToken).decimals();
        require(
            IERC20(platformToken).balanceOf(address(this)) >= amountToBuy,
            "Not enough tokens in contract"
        );
        IERC20(platformToken).transfer(msg.sender, amountToBuy);
    }

    function listToken(
        IERC20 token,
        uint256 amount,
        uint256 price
    ) external nonReentrant {
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        listings.push(Listing(msg.sender, token, amount, price));
        totalListingsCount++;
    }

    function getListingsCount() public view returns (uint256) {
        return listings.length;
    }

    function buyToken(uint256 listingIndex) external payable nonReentrant {
        Listing storage listing = listings[listingIndex];

        uint256 purchaseAmount = (msg.value / listing.price) *
            10 ** ERC20(platformToken).decimals();
        require(
            purchaseAmount <= listing.amount,
            "Not enough tokens in listing"
        );

        listing.amount -= purchaseAmount;

        require(
            listing.token.transfer(msg.sender, purchaseAmount),
            "Transfer failed"
        );
        payable(listing.seller).transfer(msg.value);

        if (listing.amount == 0) {
            listings[listingIndex] = listings[listings.length - 1];
            listings.pop();
            /* Note: totalListingsCount is not decremented to keep track of total listings created */
        }
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function setTokenPrice(uint256 _tokenPrice) external onlyOwner {
        tokenPrice = _tokenPrice;
    }
}
