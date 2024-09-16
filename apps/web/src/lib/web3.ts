import { config } from "@/providers/web3";
import { getConnectorClient } from "@wagmi/core";
import { watchAsset as watchAssetViem } from "viem/actions";
import { ArtistToken } from "@/entities";

export async function watchAsset(token: ArtistToken) {
  try {
    const walletClient = await getConnectorClient(config);
    const result = await watchAssetViem(walletClient, {
      type: "ERC20",
      options: {
        address: token.address as `0x${string}`,
        symbol: token.symbol,
        decimals: 18,
      },
    });

    return result;
  } catch (error) {
    console.error(error);
  }
  return false;
}
