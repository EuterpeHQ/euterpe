import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { getAddress } from "viem";

const deploy = async () => {
  const [owner, euterpe, account1, account2] =
    await hre.viem.getWalletClients();

  const artistToken = await hre.viem.deployContract("ArtistToken", [
    owner.account.address,
    "MyArtistToken",
    "ART",
    21000000n,
    "MyArtist",
    "https://spotify.com/myartist",
  ]);

  const uri = "";
  const artistName = "MyArtist";
  const spotifyLink = "https://spotify.com/myartist";
  const harmonyV0 = await hre.viem.deployContract("HarmonyV0", [
    owner.account.address,
    uri,
    artistName,
    spotifyLink,
    getAddress(artistToken.address),
    getAddress(euterpe.account.address),
  ]);
  return { harmonyV0, owner, account1, account2, artistToken };
};

describe("HarmonyV0 Contract", function () {
  it("Should have correct initial state", async function () {
    const { harmonyV0, owner } = await loadFixture(deploy);

    expect(await harmonyV0.read.uri([0n])).to.equal("");

    expect(
      await harmonyV0.read.balanceOf([owner.account.address, 0n])
    ).to.equal(0);

    expect(await harmonyV0.read._VERSION_()).to.equal(1);
    expect(await harmonyV0.read._SUPPORTS_ERC165_()).to.be.true;
    expect(await harmonyV0.read._SUPPORTS_ERC2981_()).to.equal(1);
    expect(await harmonyV0.read._SUPPORTS_ERC1155_()).to.equal(1);
  });

  it("Should enforce binding between an artist token and their harmonies contract", async function () {
    const { harmonyV0, artistToken } = await loadFixture(deploy);
    expect(await artistToken.read.owner()).to.equal(
      await harmonyV0.read.owner()
    );
    expect(getAddress(artistToken.address)).to.equal(
      await harmonyV0.read.artistToken()
    );
  });

  it("Should revert false binding between an artist token and their harmonies contract", async function () {
    const [owner, euterpe, account1] = await hre.viem.getWalletClients();

    const artistTokenForAccount1 = await hre.viem.deployContract(
      "ArtistToken",
      [
        account1.account.address,
        "MyArtistToken",
        "ART",
        21000000n,
        "MyArtist",
        "https://spotify.com/myartist",
      ],
      { client: { wallet: account1 } }
    );

    const uri = "";
    const artistName = "MyArtist";
    const spotifyLink = "https://spotify.com/myartist";
    await expect(
      hre.viem.deployContract("HarmonyV0", [
        owner.account.address,
        uri,
        artistName,
        spotifyLink,
        getAddress(artistTokenForAccount1.address),
        getAddress(euterpe.account.address),
      ])
    ).to.be.rejectedWith(
      "Error: Harmony must bind with artist token and it's owner"
    );
  });

  it("Should allow owner to set Token URI correctly", async function () {
    const { harmonyV0 } = await loadFixture(deploy);

    const newTokenURI = "https://ipfs.io/ipfs/newtoken/0.json";
    await harmonyV0.write.setTokenURI([0n, newTokenURI]);
    expect(await harmonyV0.read.uri([0n])).to.equal(newTokenURI);
  });

  it("Should restrict owner from changing URI after it has been set", async function () {
    const { harmonyV0 } = await loadFixture(deploy);

    const tokenURI = "https://ipfs.io/ipfs/newtoken/0.json";
    await harmonyV0.write.setTokenURI([0n, tokenURI]);
    expect(await harmonyV0.read.uri([0n])).to.equal(tokenURI);

    const newTokenURI = "https://ipfs.io/ipfs/newtoken/1.json";
    await expect(harmonyV0.write.setTokenURI([0n, newTokenURI])).to.be.rejected;
  });

  it("Should allow owner to activate harmony creation", async function () {
    const { harmonyV0, owner, artistToken } = await loadFixture(deploy);

    const euterpeContractAddress =
      await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
    await artistToken.write.approve([
      euterpeContractAddress,
      0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
    ]);

    await harmonyV0.write.activate();
    const operator = await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
    const isApproved = await harmonyV0.read.isApprovedForAll([
      owner.account.address,
      operator,
    ]);
    expect(isApproved).to.be.true;
  });

  it("Should allow unlimited approval on the artist token for EUTERPE_CONTRACT_ADDRESS after activation", async function () {
    const { harmonyV0, owner, artistToken } = await loadFixture(deploy);

    const euterpeContractAddress =
      await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
    await artistToken.write.approve([
      euterpeContractAddress,
      0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
    ]);

    const allowance = await artistToken.read.allowance([
      owner.account.address,
      euterpeContractAddress,
    ]);

    expect(allowance).to.equal(
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    );
  });

  it("Should allow owner to pause and unpause after activation", async function () {
    const { harmonyV0, account1, artistToken } = await loadFixture(deploy);

    const euterpeContractAddress =
      await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
    await artistToken.write.approve([
      euterpeContractAddress,
      0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
    ]);

    await harmonyV0.write.activate();
    await harmonyV0.write.pause();
    await expect(harmonyV0.write.mint([account1.account.address, 0n, 1n, "0x"]))
      .to.be.rejected;

    await harmonyV0.write.unpause();
    await harmonyV0.write.mint([account1.account.address, 0n, 1n, "0x"]);
    const account1Balance = await harmonyV0.read.balanceOf([
      account1.account.address,
      0n,
    ]);
    expect(account1Balance).to.equal(1);
  });

  it("Should allow owner to mint tokens after activation", async function () {
    const { harmonyV0, account1, artistToken } = await loadFixture(deploy);

    const euterpeContractAddress =
      await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
    await artistToken.write.approve([
      euterpeContractAddress,
      0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
    ]);

    await harmonyV0.write.activate();
    await harmonyV0.write.mint([account1.account.address, 0n, 100n, "0x"]);
    const account1Balance = await harmonyV0.read.balanceOf([
      account1.account.address,
      0n,
    ]);
    expect(account1Balance).to.equal(100);
  });

  it("Should allow owner to mint tokens in batch after activation", async function () {
    const { harmonyV0, account1, artistToken } = await loadFixture(deploy);

    const euterpeContractAddress =
      await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
    await artistToken.write.approve([
      euterpeContractAddress,
      0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
    ]);

    await harmonyV0.write.activate();
    const ids = [0n, 1n, 2n];
    const amounts = [10n, 20n, 30n];
    await harmonyV0.write.mintBatch([
      account1.account.address,
      ids,
      amounts,
      "0x",
    ]);

    for (let i = 0; i < ids.length; i++) {
      const balance = await harmonyV0.read.balanceOf([
        account1.account.address,
        ids[i],
      ]);
      expect(balance).to.equal(amounts[i]);
    }
  });

  it("Should revert minting if harmony creation has not been activated", async function () {
    const { harmonyV0, account1 } = await loadFixture(deploy);

    await expect(
      harmonyV0.write.mint([account1.account.address, 0n, 100n, "0x"])
    ).to.be.rejectedWith(
      "Error: You need to activate and approve the Euterpe contract to create harmonies"
    );
  });

  it("Should update purchase history correctly when minting tokens", async function () {
    const { harmonyV0, owner, account1, artistToken } =
      await loadFixture(deploy);

    const euterpeContractAddress =
      await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
    await artistToken.write.approve([
      euterpeContractAddress,
      0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
    ]);

    await harmonyV0.write.activate();
    await harmonyV0.write.mint([owner.account.address, 0n, 100n, "0x"]);
    const tokenPurchaseHistoryOwner = await harmonyV0.read.purchases([
      owner.account.address,
      0n,
      0n,
    ]);
    expect(tokenPurchaseHistoryOwner[0]).to.equal(100n);
    expect(tokenPurchaseHistoryOwner[1]).to.be.gt(0n);

    await harmonyV0.write.mint([account1.account.address, 0n, 100n, "0x"]);
    const tokenPurchaseHistoryAccount1 = await harmonyV0.read.purchases([
      account1.account.address,
      0n,
      0n,
    ]);
    expect(tokenPurchaseHistoryAccount1[0]).to.equal(100n);
    expect(tokenPurchaseHistoryAccount1[1]).to.be.gt(0n);
  });

  it("Should update purchase history correctly when transferring tokens", async function () {
    const { harmonyV0, owner, account1, artistToken } =
      await loadFixture(deploy);

    const euterpeContractAddress =
      await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
    await artistToken.write.approve([
      euterpeContractAddress,
      0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
    ]);

    await harmonyV0.write.activate();
    await harmonyV0.write.mint([owner.account.address, 0n, 100n, "0x"]);
    await harmonyV0.write.safeTransferFrom([
      owner.account.address,
      account1.account.address,
      0n,
      50n,
      "0x",
    ]);

    const tokenPurchaseHistory = await harmonyV0.read.purchases([
      account1.account.address,
      0n,
      0n,
    ]);
    expect(tokenPurchaseHistory[0]).to.equal(50n);
    expect(tokenPurchaseHistory[1]).to.be.gt(0n);
  });

  it("Should update purchase history correctly when transferring multiple tokens", async function () {
    const { harmonyV0, owner, account1, artistToken } =
      await loadFixture(deploy);

    const euterpeContractAddress =
      await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
    await artistToken.write.approve([
      euterpeContractAddress,
      0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
    ]);

    await harmonyV0.write.activate();
    await harmonyV0.write.mintBatch([
      owner.account.address,
      [0n, 1n],
      [100n, 200n],
      "0x",
    ]);

    await harmonyV0.write.safeBatchTransferFrom([
      owner.account.address,
      account1.account.address,
      [0n, 1n],
      [50n, 100n],
      "0x",
    ]);

    const token0PurchaseHistoryLength = await harmonyV0.read.getPurchaseLength([
      account1.account.address,
      0n,
    ]);
    expect(token0PurchaseHistoryLength).to.equal(1);

    const token0PurchaseHistory = await harmonyV0.read.purchases([
      account1.account.address,
      0n,
      0n,
    ]);
    expect(token0PurchaseHistory[0]).to.equal(50);
    expect(token0PurchaseHistory[1]).to.be.gt(0);

    await harmonyV0.write.safeTransferFrom([
      owner.account.address,
      account1.account.address,
      1n,
      25n,
      "0x",
    ]);

    const token1PurchaseHistoryLength = await harmonyV0.read.getPurchaseLength([
      account1.account.address,
      1n,
    ]);
    expect(token1PurchaseHistoryLength).to.equal(2);

    const token1PurchaseHistory1 = await harmonyV0.read.purchases([
      account1.account.address,
      1n,
      0n,
    ]);
    expect(token1PurchaseHistory1[0]).to.equal(100n);
    expect(token1PurchaseHistory1[1]).to.be.gt(0n);

    const token1PurchaseHistory2 = await harmonyV0.read.purchases([
      account1.account.address,
      1n,
      1n,
    ]);
    expect(token1PurchaseHistory2[0]).to.equal(25n);
    expect(token1PurchaseHistory2[1]).to.be.gt(0n);
  });

  it("Should return the correct timestamp of the first purchase", async function () {
    const { harmonyV0, owner, account1, artistToken } =
      await loadFixture(deploy);

    const euterpeContractAddress =
      await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
    await artistToken.write.approve([
      euterpeContractAddress,
      0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
    ]);
    await harmonyV0.write.activate();

    const tokenId = 0n;
    await harmonyV0.write.mint([account1.account.address, tokenId, 100n, "0x"]);

    const firstPurchaseTimestamp =
      await harmonyV0.read.getFirstPurchaseTimestamp([
        account1.account.address,
        tokenId,
      ]);

    const purchaseHistoryLength = await harmonyV0.read.getPurchaseLength([
      account1.account.address,
      tokenId,
    ]);
    expect(purchaseHistoryLength).to.be.equal(1);

    const firstPurchaseDirect = await harmonyV0.read.purchases([
      account1.account.address,
      tokenId,
      0n,
    ]);
    const directTimestamp = firstPurchaseDirect[1];

    expect(firstPurchaseTimestamp).to.equal(directTimestamp);
  });
});
