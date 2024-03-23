import hre, { viem } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { parseEther, getAddress } from "viem";

const deploy = async () => {
  const [owner, artistTokenOwner, account1, account2] =
    await hre.viem.getWalletClients();

  const platformToken = await hre.viem.deployContract("PlatformToken", [
    "Euterpe",
    "ETP",
    parseEther("21000000"),
  ]);

  const artistToken = await hre.viem.deployContract(
    "ArtistToken",
    [
      artistTokenOwner.account.address,
      "MyArtistToken",
      "ART",
      parseEther("21000000"),
      "MyArtist",
      "https://spotify.com/myartist",
    ],
    {
      client: { wallet: artistTokenOwner },
    }
  );

  const exchange = await hre.viem.deployContract("Exchange", [
    platformToken.address,
    parseEther("0.0001"),
  ]);

  await platformToken.write.transfer([exchange.address, parseEther("1000000")]);

  const publicClient = await hre.viem.getPublicClient();

  return {
    owner,
    artistTokenOwner,
    account1,
    account2,
    exchange,
    platformToken,
    artistToken,
    publicClient,
  };
};

describe("Exchange Contract", function () {
  it("Should set up initial state correctly", async function () {
    const { exchange, platformToken } = await loadFixture(deploy);
    console.log(await exchange.read.platformToken());
    console.log(platformToken.address);

    expect(await exchange.read.platformToken()).to.equal(
      getAddress(platformToken.address)
    );
    expect(await exchange.read.tokenPrice()).to.equal(parseEther("0.0001"));
    expect(await platformToken.read.balanceOf([exchange.address])).to.equal(
      parseEther("1000000")
    );
  });

  it("Should allow users to buy Euterpes", async function () {
    const { exchange, account1, platformToken } = await loadFixture(deploy);

    const exchangeAsAccount1 = await hre.viem.getContractAt(
      "Exchange",
      exchange.address,
      { client: { wallet: account1 } }
    );

    await exchangeAsAccount1.write.buy({
      value: parseEther("0.001"),
    });

    console.log("price", await exchange.read.tokenPrice());
    console.log(parseEther("0.001") / parseEther("0.0001"));
    expect(
      await platformToken.read.balanceOf([account1.account.address])
    ).to.equal(parseEther("10"));
  });

  it("Should allow artists to list their tokens for sale", async function () {
    const { exchange, artistToken, artistTokenOwner } =
      await loadFixture(deploy);

    await artistToken.write.approve([exchange.address, parseEther("50000")]);

    const exchangeAsArtistTokenOwner = await hre.viem.getContractAt(
      "Exchange",
      exchange.address,
      { client: { wallet: artistTokenOwner } }
    );
    await exchangeAsArtistTokenOwner.write.listToken([
      artistToken.address,
      parseEther("50000"),
      parseEther("0.02"),
    ]);

    const [seller, token, amount, price] = await exchange.read.listings([0n]);
    expect(seller).to.equal(getAddress(artistTokenOwner.account.address));
    expect(token).to.equal(getAddress(artistToken.address));
    expect(amount).to.equal(parseEther("50000"));
    expect(price).to.equal(parseEther("0.02"));
  });

  it("Should allow users to buy listed tokens", async function () {
    const { exchange, account1, platformToken, artistToken, artistTokenOwner } =
      await loadFixture(deploy);

    await artistToken.write.approve([exchange.address, parseEther("50000")]);

    const exchangeAsArtistTokenOwner = await hre.viem.getContractAt(
      "Exchange",
      exchange.address,
      { client: { wallet: artistTokenOwner } }
    );
    await exchangeAsArtistTokenOwner.write.listToken([
      artistToken.address,
      parseEther("50000"),
      parseEther("0.02"),
    ]);

    const exchangeAsAccount1 = await hre.viem.getContractAt(
      "Exchange",
      exchange.address,
      { client: { wallet: account1 } }
    );

    await exchangeAsAccount1.write.buyToken([0n], {
      value: parseEther("1"),
    });
    expect(
      await artistToken.read.balanceOf([account1.account.address])
    ).to.equal(parseEther("50"));
  });

  it("Should allow the owner to withdraw ETH", async function () {
    const { exchange, owner, account1, platformToken, publicClient } =
      await loadFixture(deploy);

    const exchangeAsAccount1 = await hre.viem.getContractAt(
      "Exchange",
      exchange.address,
      { client: { wallet: account1 } }
    );
    await exchangeAsAccount1.write.buy({ value: parseEther("0.14") });

    const initialOwnerBalance = await publicClient.getBalance({
      address: owner.account.address,
    });
    await exchange.write.withdraw();
    const finalOwnerBalance = await publicClient.getBalance({
      address: owner.account.address,
    });
    expect(finalOwnerBalance).to.be.gt(initialOwnerBalance);
  });

  it("Should allow the owner to set a new token price", async function () {
    const { exchange, owner } = await loadFixture(deploy);

    const newPrice = parseEther("0.0002");
    await exchange.write.setTokenPrice([newPrice]);

    expect(await exchange.read.tokenPrice()).to.equal(newPrice);
  });

  it("Should allow users to buy a partial amount from a listing", async function () {
    const { exchange, account1, artistToken, artistTokenOwner } =
      await loadFixture(deploy);

    await artistToken.write.approve([exchange.address, parseEther("100")]);

    const exchangeAsArtistTokenOwner = await hre.viem.getContractAt(
      "Exchange",
      exchange.address,
      { client: { wallet: artistTokenOwner } }
    );
    await exchangeAsArtistTokenOwner.write.listToken([
      artistToken.address,

      parseEther("100"),
      parseEther("0.01"),
    ]);

    const exchangeAsAccount1 = await hre.viem.getContractAt(
      "Exchange",
      exchange.address,
      { client: { wallet: account1 } }
    );
    await exchangeAsAccount1.write.buyToken([0n], {
      value: parseEther("0.5"),
      client: { wallet: account1 },
    });

    const [seller, token, amount, price] = await exchange.read.listings([0n]);
    expect(amount).to.equal(parseEther("50"));
  });

  it("Should remove a listing once it's fully bought", async function () {
    const { exchange, account1, artistToken, artistTokenOwner } =
      await loadFixture(deploy);

    await artistToken.write.approve([exchange.address, parseEther("50")]);

    const exchangeAsArtistTokenOwner = await hre.viem.getContractAt(
      "Exchange",
      exchange.address,
      { client: { wallet: artistTokenOwner } }
    );
    await exchangeAsArtistTokenOwner.write.listToken([
      artistToken.address,
      parseEther("50"),
      parseEther("0.01"),
    ]);

    const exchangeAsAccount1 = await hre.viem.getContractAt(
      "Exchange",
      exchange.address,
      { client: { wallet: account1 } }
    );
    await exchangeAsAccount1.write.buyToken([0n], {
      value: parseEther("0.5"),
      client: { wallet: account1 },
    });

    const listingsCount = await exchange.read.getListingsCount();
    expect(listingsCount).to.equal(0);
  });
});
