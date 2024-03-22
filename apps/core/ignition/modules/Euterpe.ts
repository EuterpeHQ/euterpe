import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EuterpeV0Module = buildModule("EuterpeV0Module", (m) => {
  const EuterpeV0 = m.contract("EuterpeV0");

  return { EuterpeV0 };
});

export default EuterpeV0Module;
