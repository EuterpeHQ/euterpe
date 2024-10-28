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
import type {
  BaseError,
  ReadContractErrorType,
  WriteContractErrorType,
} from "@wagmi/core";

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

export async function getArtistTokenByAddress(tokenAddress: `0x${string}`) {
  try {
    const tokenDetails = await readContracts(config, {
      contracts: [
        {
          address: tokenAddress as `0x${string}`,
          abi: artistTokenAbi,
          functionName: "name",
        },
        {
          address: tokenAddress as `0x${string}`,
          abi: artistTokenAbi,
          functionName: "symbol",
        },
        {
          address: tokenAddress as `0x${string}`,
          abi: artistTokenAbi,
          functionName: "totalSupply",
        },
        {
          address: tokenAddress as `0x${string}`,
          abi: artistTokenAbi,
          functionName: "artist",
        },
        {
          address: tokenAddress as `0x${string}`,
          abi: artistTokenAbi,
          functionName: "owner",
        },
      ],
    });

    return {
      data: {
        address: tokenAddress,
        name: tokenDetails[0].result as string,
        symbol: tokenDetails[1].result as string,
        totalSupply: formatEther(tokenDetails[2].result as bigint),
        value: "0",
        artistName: tokenDetails[3].result as string,
        owner: tokenDetails[4].result as `0x${string}`,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error: error as ReadContractErrorType };
  }
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

export async function getTokenStatus(tokenAddress: `0x${string}`) {
  const totalListings = await readContract(config, {
    abi: exchangeAbi,
    address: process.env
      .NEXT_PUBLIC_EXCHANGE_SMART_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "getListingsCount",
  });

  for (let i = 0n; i < totalListings; i++) {
    const listing = await readContract(config, {
      abi: exchangeAbi,
      address: process.env
        .NEXT_PUBLIC_EXCHANGE_SMART_CONTRACT_ADDRESS as `0x${string}`,
      functionName: "listings",
      args: [i],
    });
    if (listing[1] === tokenAddress) {
      return true;
    }
  }

  return false;
}

export async function buyArtistToken(
  tokenAddress: `0x${string}`,
  value: string,
) {
  try {
    const totalListings = await readContract(config, {
      abi: exchangeAbi,
      address: process.env
        .NEXT_PUBLIC_EXCHANGE_SMART_CONTRACT_ADDRESS as `0x${string}`,
      functionName: "getListingsCount",
    });

    for (let i = 0n; i < totalListings; i++) {
      const listing = await readContract(config, {
        abi: exchangeAbi,
        address: process.env
          .NEXT_PUBLIC_EXCHANGE_SMART_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "listings",
        args: [i],
      });

      if (listing[1] === tokenAddress) {
        const valueFormatted = parseEther(value);
        const hash = await writeContract(config, {
          address: process.env
            .NEXT_PUBLIC_EXCHANGE_SMART_CONTRACT_ADDRESS as `0x${string}`,
          abi: exchangeAbi,
          functionName: "buyToken",
          args: [i],
          value: valueFormatted,
        });

        await waitForTransactionReceipt(config, { hash });

        return { data: hash, error: null };
      }
    }

    throw new Error("Token not listed on the exchange");
  } catch (error) {
    return { data: null, error: error as WriteContractErrorType };
  }
}

export async function sendArtistToken(
  tokenAddress: `0x${string}`,
  to: `0x${string}`,
  amount: string,
) {
  try {
    const amountFormatted = parseEther(amount);
    const hash = await writeContract(config, {
      address: tokenAddress,
      abi: artistTokenAbi,
      functionName: "transfer",
      args: [to, amountFormatted],
    });

    await waitForTransactionReceipt(config, {
      hash,
    });

    return { data: hash, error: null };
  } catch (error) {
    return { data: null, error: error as WriteContractErrorType };
  }
}

export async function getTokenAssets(fanAddress: `0x${string}`) {
  const tokens: {
    tokenAddress: `0x${string}`;
    balance: string;
    name: string;
    symbol: string;
  }[] = [];

  const allTokens = await getArtistTokens();

  for (const token of allTokens) {
    const balance = await readContract(config, {
      abi: artistTokenAbi,
      address: token.address as `0x${string}`,
      functionName: "balanceOf",
      args: [fanAddress],
    });

    if (balance > 0n) {
      tokens.push({
        tokenAddress: token.address as `0x${string}`,
        balance: formatEther(balance),
        name: token.name,
        symbol: token.symbol,
      });
    }
  }

  return tokens;
}
