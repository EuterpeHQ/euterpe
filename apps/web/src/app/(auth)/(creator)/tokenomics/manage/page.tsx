"use client";
import React, { useEffect, useState } from "react";
import { abi as artistTokenFactoryAbi } from "@/abis/ArtistTokenFactory";
import { abi as artistTokenAbi } from "@/abis/ArtistToken";
import { useAccount } from "wagmi";
import CreateArtistToken from "@/partials/token/CreateArtistToken";
import ArtistToken from "@/partials/token/ArtistToken";
import { ArtistToken as ArtistTokenProps } from "@/entities";
import { readContract, readContracts } from "@wagmi/core";
import { config } from "@/providers/web3";
import { formatEther } from "viem";

function Page() {
  const { address } = useAccount();
  const [artistToken, setArtistToken] = useState<ArtistTokenProps | null>(null);

  const fetchArtistToken = async () => {
    const tokenAddresses = [];

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
        if (address === owner) {
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

          setArtistToken({
            address: tokenAddresses[Number(i)] as `0x${string}`,
            name: token[0].result!,
            symbol: token[1].result!,
            value: "0",
            totalSupply: formatEther(token[2].result!),
            owner: address,
            artistName: token[3].result!,
          });
        }
      }
      return artistToken;
    }
  };

  useEffect(() => {
    fetchArtistToken();
  }, [address]);

  return (
    <>
      {artistToken ? <ArtistToken {...artistToken} /> : <CreateArtistToken />}
    </>
  );
}

export default Page;
