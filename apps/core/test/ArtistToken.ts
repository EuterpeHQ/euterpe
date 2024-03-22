import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { parseEther } from "viem";

const deploy = async () => {
  const [owner, account1, account2] = await hre.viem.getWalletClients();
  const artistToken = await hre.viem.deployContract("ArtistToken", [
    owner.account.address,
    "MyArtistToken",
    "ART",
    21000000n,
    "MyArtist",
    "https://spotify.com/myartist",
  ]);
  return { artistToken, owner, account1, account2 };
};

describe("Artist Token", function () {
  it("Should have correct name, symbol, artist, and initial supply", async function () {
    const { artistToken } = await loadFixture(deploy);
    expect(await artistToken.read.name()).to.equal("MyArtistToken");
    expect(await artistToken.read.symbol()).to.equal("ART");
    expect(await artistToken.read.artist()).to.equal("MyArtist");
    expect(await artistToken.read.spotify()).to.equal(
      "https://spotify.com/myartist"
    );
    expect(await artistToken.read.totalSupply()).to.equal(
      parseEther("21000000")
    );
  });

  it("Should assign the total supply to the owner", async function () {
    const { artistToken, owner } = await loadFixture(deploy);
    const ownerBalance = await artistToken.read.balanceOf([
      owner.account.address,
    ]);
    expect(ownerBalance).to.equal(parseEther("21000000"));
  });

  it("Should allow owner to pause and unpause token transfers", async function () {
    const { artistToken, account1 } = await loadFixture(deploy);

    await artistToken.write.pause();
    await expect(
      artistToken.write.transfer([account1.account.address, parseEther("1000")])
    ).to.be.rejected;

    await artistToken.write.unpause();
    await artistToken.write.transfer([
      account1.account.address,
      parseEther("1000"),
    ]);
    const account1Balance = await artistToken.read.balanceOf([
      account1.account.address,
    ]);
    expect(account1Balance).to.equal(parseEther("1000"));
  });

  it("Should allow owner to mint new tokens", async function () {
    const { artistToken, account1 } = await loadFixture(deploy);

    await artistToken.write.mint([
      account1.account.address,
      parseEther("1000"),
    ]);
    const account1Balance = await artistToken.read.balanceOf([
      account1.account.address,
    ]);
    expect(account1Balance).to.equal(parseEther("1000"));
  });
});
