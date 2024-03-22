import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const YouTubeStreamsAggregatorModule = buildModule(
  "YouTubeStreamsAggregatorModule",
  (m) => {
    const YouTubeStreamsAggregator = m.contract("YouTubeStreamsAggregator");

    return { YouTubeStreamsAggregator };
  }
);

export default YouTubeStreamsAggregatorModule;
