"use client";
import React, { useEffect, useState, useRef } from "react";
import { abi as artistTokenFactoryAbi } from "@/abis/ArtistTokenFactory";
import { abi as artistTokenAbi } from "@/abis/ArtistToken";
import { useAccount } from "wagmi";
import CreateArtistToken from "@/partials/token/CreateArtistToken";
import ArtistToken from "@/partials/token/ArtistToken";
import { ArtistToken as ArtistTokenProps } from "@/entities";
import { readContract, readContracts } from "@wagmi/core";
import { config } from "@/providers/web3";
import { formatEther } from "viem";
import ArtistTokenSkeleton from "@/partials/token/ArtistTokenSkeleton";
import NoArtistToken from "@/partials/token/NoArtistToken";
import { watchAsset } from "@/lib/web3";

function Page() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [artistToken, setArtistToken] = useState<ArtistTokenProps | null>(null);
  const [isTokenCreated, setIsTokenCreated] = useState(false);
  const hasWatchedAsset = useRef(false);

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
    const fetchArtistTokenAsync = async () => {
      setIsLoading(true);
      setArtistToken(null);
      await fetchArtistToken();
      setIsLoading(false);
    };

    fetchArtistTokenAsync();
  }, [address, isTokenCreated]);

  useEffect(() => {
    async function watchAssetAsync() {
      if (artistToken && !hasWatchedAsset.current) {
        const result = await watchAsset(artistToken);
        hasWatchedAsset.current = result;
      }
    }

    watchAssetAsync();
  }, [artistToken]);

  return (
    <div className="max-w-9xl mx-auto flex h-full w-full flex-col px-5 pb-5">
      <h2 className="py-6 font-azeret text-2xl font-medium tracking-[-0.06rem]">
        Token
      </h2>
      {isLoading ? (
        <ArtistTokenSkeleton />
      ) : artistToken ? (
        <ArtistToken {...artistToken} />
      ) : (
        <NoArtistToken
          onTokenCreated={() => setIsTokenCreated((prev) => !prev)}
        />
      )}
    </div>
  );
}

export default Page;
