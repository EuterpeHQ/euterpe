import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

const deploy = async () => {
  const [owner, account1] = await hre.viem.getWalletClients();

  const youTubeStreamsAggregator = await hre.viem.deployContract(
    "YouTubeStreamsAggregator",
    []
  );

  const publicClient = await hre.viem.getPublicClient();

  return { youTubeStreamsAggregator, owner, account1, publicClient };
};

describe("YouTubeStreamsAggregator Contract", function () {
  it("Should have correct initial state", async function () {
    const { youTubeStreamsAggregator } = await loadFixture(deploy);

    expect(await youTubeStreamsAggregator.read.decimals()).to.equal(0);
    expect(await youTubeStreamsAggregator.read.description()).to.equal(
      "YouTube Streams Aggregator"
    );
    expect(await youTubeStreamsAggregator.read.version()).to.equal(0);
  });

  it("Should allow owner to update streams for multiple artists in batch", async function () {
    const { youTubeStreamsAggregator, owner } = await loadFixture(deploy);

    const artists = ["Artist1", "Artist2"];
    const streams = [100, 200];

    await youTubeStreamsAggregator.write.updateArtistStreamsBatch([
      artists,
      streams.map(BigInt),
    ]);

    for (let i = 0; i < artists.length; i++) {
      const [artistStreams, updatedAt] =
        await youTubeStreamsAggregator.read.getArtistStreams([artists[i]]);
      expect(artistStreams).to.equal(streams[i]);
    }
  });

  it("Should allow public to view aggregated data for artists", async function () {
    const { youTubeStreamsAggregator, account1 } = await loadFixture(deploy);

    const artists = ["Artist1", "Artist2"];
    const streams = [100, 200];

    await youTubeStreamsAggregator.write.updateArtistStreamsBatch([
      artists,
      streams.map(BigInt),
    ]);

    const youTubeStreamsAggregatorAsAccount1 = await hre.viem.getContractAt(
      "YouTubeStreamsAggregator",
      youTubeStreamsAggregator.address,
      { client: { wallet: account1 } }
    );

    for (let i = 0; i < artists.length; i++) {
      const [artistStreams, updatedAt] =
        await youTubeStreamsAggregatorAsAccount1.read.getArtistStreams([
          artists[i],
        ]);
      expect(artistStreams).to.equal(streams[i]);
    }
  });

  it("Should prevent non-owners from updating artist streams", async function () {
    const { youTubeStreamsAggregator, account1 } = await loadFixture(deploy);

    const artists = ["Artist3", "Artist4"];
    const streams = [300, 400];

    const youTubeStreamsAggregatorAsAccount1 = await hre.viem.getContractAt(
      "YouTubeStreamsAggregator",
      youTubeStreamsAggregator.address,
      { client: { wallet: account1 } }
    );

    await expect(
      youTubeStreamsAggregatorAsAccount1.write.updateArtistStreamsBatch([
        artists,
        streams.map(BigInt),
      ])
    ).to.be.rejected;
  });
});
