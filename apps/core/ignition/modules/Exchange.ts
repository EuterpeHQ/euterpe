import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const ExchangeModule = buildModule("ExchangeModule", (m) => {
  const platformTokenAddress = "0xb334A2EdB610d0d71894f103535f8147A120444A";
  const tokenPrice = parseEther("0.0001");
  const Exchange = m.contract("Exchange", [platformTokenAddress, tokenPrice]);

  return { Exchange };
});

export default ExchangeModule;
