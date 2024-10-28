import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { getAddress, parseEther } from "viem";

const deploy = async () => {
  const [owner, euterpeDeployer, account1, account2] =
    await hre.viem.getWalletClients();

  const artistToken = await hre.viem.deployContract("ArtistToken", [
    owner.account.address,
    "MyArtistToken",
    "ART",
    21000000n,
    "MyArtist",
    "https://spotify.com/myartist",
  ]);

  const euterpe = await hre.viem.deployContract("EuterpeV0", [], {
    client: { wallet: euterpeDeployer },
  });

  const uri = "";
  const artistName = "MyArtist";
  const spotifyLink = "https://spotify.com/myartist";
  const harmonyV0 = await hre.viem.deployContract("HarmonyV0", [
    owner.account.address,
    uri,
    artistName,
    spotifyLink,
    getAddress(artistToken.address),
    getAddress(euterpe.address),
  ]);

  return { euterpe, artistToken, harmonyV0, owner, account1, account2 };
};

const setup = async <
  AT extends {
    read: any;
    write: any;
  },
  H extends {
    read: any;
    write: any;
  },
>(
  artistToken: AT,
  harmonyV0: H
) => {
  const euterpeContractAddress =
    await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
  await artistToken.write.approve([
    euterpeContractAddress,
    0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
  ]);
  await harmonyV0.write.activate();
  await harmonyV0.write.activate();
  return { activatedHarmonyV0: harmonyV0 };
};

describe("Euterpe Contract", function () {
  it("Should enforce withdrawal restrictions on non-harmony owners", async function () {
    const { euterpe, artistToken, harmonyV0, account1 } =
      await loadFixture(deploy);

    const euterpeAsAccount1 = await hre.viem.getContractAt(
      "EuterpeV0",
      euterpe.address,
      { client: { wallet: account1 } }
    );
    await expect(
      euterpeAsAccount1.write.withdraw([
        getAddress(artistToken.address),
        getAddress(harmonyV0.address),
        0n,
      ])
    ).to.be.rejectedWith("Only Harmony Owner");
  });

  it("Should allow withdrawals for Harmony token id 0 owners and track withdrawals correctly", async function () {
    const { euterpe, artistToken, harmonyV0, account1 } =
      await loadFixture(deploy);

    await artistToken.write.transfer([
      account1.account.address,
      parseEther("100"),
    ]);

    const euterpeContractAddress =
      await harmonyV0.read.EUTERPE_CONTRACT_ADDRESS();
    await artistToken.write.approve([
      euterpeContractAddress,
      0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
    ]);
    await harmonyV0.write.activate();
    await harmonyV0.write.mint([account1.account.address, 0n, 1n, "0x"]);

    const previousWithdrawalTimestamp =
      await euterpe.read.lastWithdrawalTimestamp([
        getAddress(account1.account.address),
        0n,
      ]);
    const euterpeAsAccount1 = await hre.viem.getContractAt(
      "EuterpeV0",
      euterpe.address,
      { client: { wallet: account1 } }
    );
    await expect(
      euterpeAsAccount1.write.withdraw([
        getAddress(artistToken.address),
        getAddress(harmonyV0.address),
        0n,
      ])
    ).to.not.be.rejected;

    const nextWithdrawalTimestamp = await euterpe.read.lastWithdrawalTimestamp([
      getAddress(account1.account.address),
      0n,
    ]);
    expect(nextWithdrawalTimestamp).to.gt(previousWithdrawalTimestamp);
  });
});
