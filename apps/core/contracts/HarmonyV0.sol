// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "./abstracts/ArtistAdaptable.sol";
import "./interfaces/IHarmonyV0.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract HarmonyV0 is
    IHarmonyV0,
    ERC1155,
    Ownable,
    ERC1155Pausable,
    ERC1155Burnable,
    ERC1155Supply,
    ArtistAdaptable
{
    uint8 public constant _VERSION_ = 1;
    bool public constant _SUPPORTS_ERC165_ = true;
    uint8 public constant _SUPPORTS_ERC2981_ = 1;
    uint8 public constant _SUPPORTS_ERC1155_ = 1;
    address public EUTERPE_CONTRACT_ADDRESS;

    uint256 public constant FIFTY_ARTIST_TOKEN_YIELD_10_PERCENT_HARMONY = 0;
    uint256 public constant ONE_PERCENT_OF_YOUTUBE_VIDEO_VIEWS_REVENUE_HARMONY =
        1;
    uint256 public constant ARTIST_TOKEN_YIELD_HARMONY = 2;
    uint256 public constant STREAMS_REVENUE_HARMONY = 3;
    uint256 public constant TICKET_SALES_REVENUE_HARMONY = 4;
    uint256 public constant ROYALTIES_HARMONY = 5;
    uint256 public constant TOUR_REVENUE_HARMONY = 6;
    uint256 public constant MUSIC_RIGHTS_HARMONY = 7;

    address public artistToken;
    mapping(uint256 => string) public _uri;
    struct HarmonyPurchase {
        uint256 quantity;
        uint256 timestamp;
    }
    mapping(address => mapping(uint256 => HarmonyPurchase[])) public purchases;

    constructor(
        address owner,
        string memory uri_,
        string memory artist,
        string memory spotify,
        address artistToken_,
        address euterpe
    ) ERC1155(uri_) Ownable(owner) ArtistAdaptable(artist, spotify) {
        require(
            owner == Ownable(artistToken_).owner(),
            "Error: Harmony must bind with artist token and it's owner"
        );
        artistToken = artistToken_;
        EUTERPE_CONTRACT_ADDRESS = euterpe;
    }

    modifier onlyApprovedToCreateHarmony() {
        require(
            isApprovedForAll(msg.sender, EUTERPE_CONTRACT_ADDRESS),
            "Error: You need to activate and approve the Euterpe contract to create harmonies"
        );
        _;
    }

    function uri(
        uint256 _tokenId
    ) public view override returns (string memory) {
        return _uri[_tokenId];
    }

    function setTokenURI(uint256 tokenId, string memory uri_) public onlyOwner {
        require(
            bytes(_uri[tokenId]).length == 0,
            "Error: Cannot set URI twice"
        );
        _uri[tokenId] = uri_;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner onlyApprovedToCreateHarmony {
        _mint(account, id, amount, data);
        updatePurchaseHistory(account, id, amount);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner onlyApprovedToCreateHarmony {
        _mintBatch(to, ids, amounts, data);
        for (uint256 i = 0; i < ids.length; i++) {
            updatePurchaseHistory(to, ids[i], amounts[i]);
        }
    }

    function activate() public onlyOwner {
        require(
            IERC20(artistToken).allowance(
                msg.sender,
                EUTERPE_CONTRACT_ADDRESS
            ) == type(uint256).max
        );
        setApprovalForAll(EUTERPE_CONTRACT_ADDRESS, true);
    }

    function updatePurchaseHistory(
        address to,
        uint256 id,
        uint256 value
    ) internal {
        HarmonyPurchase[] storage tokenTransfers = purchases[to][id];
        tokenTransfers.push(HarmonyPurchase(value, block.timestamp));
    }

    function getPurchaseLength(
        address to,
        uint256 id
    ) public view returns (uint256) {
        return purchases[to][id].length;
    }

    function getFirstPurchaseTimestamp(
        address user,
        uint256 tokenId
    ) external view returns (uint256) {
        require(purchases[user][tokenId].length > 0, "No purchases found");
        return purchases[user][tokenId][0].timestamp;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public override {
        address sender = _msgSender();
        if (from != sender && !isApprovedForAll(from, sender)) {
            revert ERC1155MissingApprovalForAll(sender, from);
        }
        _safeTransferFrom(from, to, id, value, data);
        updatePurchaseHistory(to, id, value);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public override {
        address sender = _msgSender();
        if (from != sender && !isApprovedForAll(from, sender)) {
            revert ERC1155MissingApprovalForAll(sender, from);
        }
        _safeBatchTransferFrom(from, to, ids, values, data);
        for (uint256 i = 0; i < ids.length; i++) {
            updatePurchaseHistory(to, ids[i], values[i]);
        }
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Pausable, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
}
