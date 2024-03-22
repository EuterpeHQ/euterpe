import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const PlatformTokenModule = buildModule("PlatformTokenModule", (m) => {
  const platformToken = m.contract("PlatformToken", [
    "Euterpe",
    "ETP",
    parseEther("21000000"),
  ]);

  return { platformToken };
});

export default PlatformTokenModule;
