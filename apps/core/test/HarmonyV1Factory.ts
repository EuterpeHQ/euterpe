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

  const factory = await hre.viem.deployContract("HarmonyV0Factory", [
    euterpe.account.address,
  ]);
  return { factory, owner, account1, account2, artistToken };
};

describe("HarmonyV0Factory", function () {
  it("Should create a new HarmonyV0 contract", async function () {
    const { factory, artistToken } = await loadFixture(deploy);

    const uri = "https://ipfs.io/ipfs/newtoken/0.json";
    const artistName = "MyArtist";
    const spotifyLink = "https://spotify.com/myartist";

    await factory.write.createHarmony([
      uri,
      artistName,
      spotifyLink,
      getAddress(artistToken.address),
    ]);
    const harmonyCount = await factory.read.getHarmonyCount();
    expect(harmonyCount).to.equal(1);

    const harmonyAddress = await factory.read.getHarmonyAddress([0n]);
    expect(harmonyAddress).to.not.be.undefined;
  });

  it("Should return correct HarmonyV0 contract addresses", async function () {
    const { factory, artistToken } = await loadFixture(deploy);

    const uri = "https://ipfs.io/ipfs/newtoken/0.json";
    const artistName = "MyArtist";
    const spotifyLink = "https://spotify.com/myartist";

    await factory.write.createHarmony([
      uri,
      artistName,
      spotifyLink,
      getAddress(artistToken.address),
    ]);
    await factory.write.createHarmony([
      uri,
      artistName,
      spotifyLink,
      getAddress(artistToken.address),
    ]);
    const harmonyCount = await factory.read.getHarmonyCount();
    expect(harmonyCount).to.equal(2);

    const harmonyAddress1 = await factory.read.getHarmonyAddress([0n]);
    const harmonyAddress2 = await factory.read.getHarmonyAddress([1n]);
    expect(harmonyAddress1).to.not.equal(harmonyAddress2);
  });

  it("Should revert when trying to access out of bounds HarmonyV0 contract address", async function () {
    const { factory } = await loadFixture(deploy);

    await expect(factory.read.getHarmonyAddress([0n])).to.be.rejectedWith(
      "Index out of bounds"
    );
  });
});
