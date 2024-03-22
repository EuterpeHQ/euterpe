import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HarmonyV0FactoryModule = buildModule("HarmonyV0FactoryModule", (m) => {
  const EuterpeContractAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
  const HarmonyV0Factory = m.contract("HarmonyV0Factory", [
    EuterpeContractAddress,
  ]);

  return { HarmonyV0Factory };
});

export default HarmonyV0FactoryModule;
