import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { getAddress, parseEther } from "viem";

const deploy = async () => {
  const [owner, account1, account2] = await hre.viem.getWalletClients();
  const platformToken = await hre.viem.deployContract("PlatformToken", [
    "Euterpe",
    "ETP",
    21000000n,
  ]);
  const publicClient = await hre.viem.getPublicClient();

  return { platformToken, owner, account1, account2, publicClient };
};

describe("Platform Token", function () {
  it("Should have correct name, symbol, and initial supply", async function () {
    const { platformToken } = await loadFixture(deploy);
    expect(await platformToken.read.name()).to.equal("Euterpe");
    expect(await platformToken.read.symbol()).to.equal("ETP");
    expect(await platformToken.read.totalSupply()).to.equal(
      parseEther("21000000")
    );
  });

  it("Should assign the total supply to the owner", async function () {
    const { platformToken, owner } = await loadFixture(deploy);
    const ownerBalance = await platformToken.read.balanceOf([
      getAddress(owner.account.address),
    ]);
    expect(ownerBalance).to.equal(parseEther("21000000"));
  });

  it("Should allow transfer of tokens between accounts", async function () {
    const { platformToken, account1, account2 } = await loadFixture(deploy);

    await platformToken.write.transfer([
      account1.account.address,
      parseEther("1000"),
    ]);
    const account1Balance = await platformToken.read.balanceOf([
      account1.account.address,
    ]);
    expect(account1Balance).to.equal(parseEther("1000"));

    const platformTokenAsAccount1 = await hre.viem.getContractAt(
      "PlatformToken",
      platformToken.address,
      { client: { wallet: account1 } }
    );
    await platformTokenAsAccount1.write.transfer([
      account2.account.address,
      parseEther("500"),
    ]);
    const account2Balance = await platformToken.read.balanceOf([
      account2.account.address,
    ]);
    expect(account2Balance).to.equal(parseEther("500"));
  });

  it("Should allow owner to pause and unpause token transfers", async function () {
    const { platformToken, account1 } = await loadFixture(deploy);

    await platformToken.write.pause();
    await expect(
      platformToken.write.transfer([
        account1.account.address,
        parseEther("1000"),
      ])
    ).to.be.rejected;

    await platformToken.write.unpause();
    await platformToken.write.transfer([
      account1.account.address,
      parseEther("1000"),
    ]);
    const account1Balance = await platformToken.read.balanceOf([
      account1.account.address,
    ]);
    expect(account1Balance).to.equal(parseEther("1000"));
  });

  it("Should allow owner to mint new tokens", async function () {
    const { platformToken, account1 } = await loadFixture(deploy);

    await platformToken.write.mint([
      account1.account.address,
      parseEther("1000"),
    ]);
    const account1Balance = await platformToken.read.balanceOf([
      account1.account.address,
    ]);
    expect(account1Balance).to.equal(parseEther("1000"));
  });
});
