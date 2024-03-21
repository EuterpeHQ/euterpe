import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { parseEther, getAddress } from "viem";

const deploy = async () => {
  const [owner, account1, account2] = await hre.viem.getWalletClients();
  console.log(getAddress(owner.account.address));
  const artistTokenFactory =
    await hre.viem.deployContract("ArtistTokenFactory");
  return { artistTokenFactory, owner, account1, account2 };
};

describe("Artist Token Factory", function () {
  it("Should create a new ArtistToken correctly", async function () {
    const { artistTokenFactory, owner } = await loadFixture(deploy);

    const tokenName = "MyArtistToken";
    const tokenSymbol = "ART";
    const initialSupply = 21000000n;
    const artistName = "MyArtist";
    const spotifyLink = "https://spotify.com/myartist";

    await artistTokenFactory.write.createToken([
      tokenName,
      tokenSymbol,
      // @ts-expect-error
      initialSupply,
      artistName,
      spotifyLink,
    ]);

    const tokenCount = await artistTokenFactory.read.getTokenCount();
    expect(tokenCount).to.equal(1);

    const tokenAddress = await artistTokenFactory.read.getTokenAddress([0n]);
    const artistToken = await hre.viem.getContractAt(
      "ArtistToken",
      tokenAddress
    );
    expect(await artistToken.read.name()).to.equal(tokenName);
    expect(await artistToken.read.symbol()).to.equal(tokenSymbol);
    expect(await artistToken.read.artist()).to.equal(artistName);
    expect(await artistToken.read.spotify()).to.equal(spotifyLink);
    expect(await artistToken.read.totalSupply()).to.equal(
      parseEther("21000000")
    );
    expect(await artistToken.read.balanceOf([owner.account.address])).to.equal(
      parseEther("21000000")
    );
  });

  it("Should return correct token count and addresses", async function () {
    const { artistTokenFactory, owner } = await loadFixture(deploy);

    const tokenName = "MyArtistToken";
    const tokenSymbol = "ART";
    const initialSupply = 21000000n;
    const artistName = "MyArtist";
    const spotifyLink = "https://spotify.com/myartist";

    await artistTokenFactory.write.createToken([
      tokenName,
      tokenSymbol,
      // @ts-expect-error
      initialSupply,
      artistName,
      spotifyLink,
    ]);
    await artistTokenFactory.write.createToken([
      tokenName,
      tokenSymbol,
      // @ts-expect-error
      initialSupply,
      artistName,
      spotifyLink,
    ]);

    const tokenCount = await artistTokenFactory.read.getTokenCount();
    expect(tokenCount).to.equal(2);

    const tokenAddress1 = await artistTokenFactory.read.getTokenAddress([0n]);
    const tokenAddress2 = await artistTokenFactory.read.getTokenAddress([1n]);
    expect(tokenAddress1).to.not.equal(tokenAddress2);
  });

  it("Should revert when trying to access out of bounds token address", async function () {
    const { artistTokenFactory } = await loadFixture(deploy);

    await expect(
      artistTokenFactory.read.getTokenAddress([0n])
    ).to.be.rejectedWith("Index out of bounds");
  });
});
