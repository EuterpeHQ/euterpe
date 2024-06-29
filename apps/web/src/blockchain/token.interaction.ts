import { ArtistToken } from "@/entities";
import { abi as artistTokenFactoryAbi } from "@/abis/ArtistTokenFactory";
import { abi as artistTokenAbi } from "@/abis/ArtistToken";
import { readContract, readContracts } from "@wagmi/core";
import { config } from "@/providers/web3";
import { formatEther } from "viem";

/**
 * [KNOWN ERROR]
 * When there is no web3 provider or connector (e.g., MetaMask),
 * after one successful readContract call, all succeeding calls fail with a weird error:
 * "Chain not configured. Version: @wagmi/core@2.10.2".
 * For now we will assume that a web3 provider is properly configured before calling this function.
 */
export async function getArtistTokens() {
  const tokenAddresses = [];
  const tokens: ArtistToken[] = [];

  const count = await readContract(config, {
    abi: artistTokenFactoryAbi,
    address: process.env
      .NEXT_PUBLIC_ARTIST_TOKEN_SMART_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "getTokenCount",
  });

  if (count) {
    for (let i = BigInt(0); i < count; i++) {
      const tokenAddress = await readContract(config, {
        abi: artistTokenFactoryAbi,
        address: process.env
          .NEXT_PUBLIC_ARTIST_TOKEN_SMART_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "getTokenAddress",
        args: [i],
      });
      tokenAddresses.push(tokenAddress);
    }
  }

  if (tokenAddresses.length > 0) {
    for (let i = BigInt(0); i < count; i++) {
      const owner = await readContract(config, {
        abi: artistTokenAbi,
        address: tokenAddresses[Number(i)] as `0x${string}`,
        functionName: "owner",
      });
      const wagmiContractConfig = {
        address: tokenAddresses[Number(i)] as `0x${string}`,
        abi: artistTokenAbi,
      };
      const token = await readContracts(config, {
        contracts: [
          {
            ...wagmiContractConfig,
            functionName: "name",
          },
          {
            ...wagmiContractConfig,
            functionName: "symbol",
          },
          {
            ...wagmiContractConfig,
            functionName: "totalSupply",
          },
          {
            ...wagmiContractConfig,
            functionName: "artist",
          },
        ],
      });

      tokens.push({
        address: tokenAddresses[Number(i)] as `0x${string}`,
        name: token[0].result!,
        symbol: token[1].result!,
        value: "0",
        totalSupply: formatEther(token[2].result!),
        owner: owner,
        artistName: token[3].result!,
      });
    }
  }

  return tokens;
}
