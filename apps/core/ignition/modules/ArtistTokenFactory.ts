import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ArtistTokenFactoryModule = buildModule(
  "ArtistTokenFactoryModule",
  (m) => {
    const ArtistTokenFactory = m.contract("ArtistTokenFactory");

    return { ArtistTokenFactory };
  }
);

export default ArtistTokenFactoryModule;
