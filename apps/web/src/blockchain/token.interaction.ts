import { ArtistToken } from "@/entities";
import { abi as artistTokenFactoryAbi } from "@/abis/ArtistTokenFactory";
import { abi as artistTokenAbi } from "@/abis/ArtistToken";
import { abi as exchangeAbi } from "@/abis/Exchange";
import {
  readContract,
  readContracts,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { config } from "@/providers/web3";
import { formatEther, parseEther } from "viem";
import type { BaseError, WriteContractErrorType } from "@wagmi/core";

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

export async function getArtistTokenByArtistAddress(
  artistAddress: `0x${string}`,
) {
  const tokens = await getArtistTokens();
  return tokens.find((token) => token.owner === artistAddress);
}

export async function approveTokenForListing(tokenAddress: `0x${string}`) {
  try {
    const amount = parseEther("900000");
    const hash = await writeContract(config, {
      address: tokenAddress,
      abi: artistTokenAbi,
      functionName: "approve",
      args: [
        process.env
          .NEXT_PUBLIC_EXCHANGE_SMART_CONTRACT_ADDRESS as `0x${string}`,
        amount,
      ],
    });

    await waitForTransactionReceipt(config, {
      hash,
    });

    return { data: hash, error: null };
  } catch (error) {
    return { data: null, error: error as WriteContractErrorType };
  }
}

export async function listArtistToken(tokenAddress: `0x${string}`) {
  try {
    const amount = parseEther("900000");
    const price = parseEther("0.0001");
    const hash = await writeContract(config, {
      address: process.env
        .NEXT_PUBLIC_EXCHANGE_SMART_CONTRACT_ADDRESS as `0x${string}`,
      abi: exchangeAbi,
      functionName: "listToken",
      args: [tokenAddress, amount, price],
    });

    await waitForTransactionReceipt(config, {
      hash,
    });

    return { data: hash, error: null };
  } catch (error) {
    return { data: null, error: error as WriteContractErrorType };
  }
}
