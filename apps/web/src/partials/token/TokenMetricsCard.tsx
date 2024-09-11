import { ArtistToken as ArtistTokenProps } from "@/entities";
import { formatAddress } from "@/lib/utils";
import { LuExternalLink } from "react-icons/lu";
import Link from "next/link";

export default function TokenMetricsCard(props: ArtistTokenProps) {
  return (
    <div className="flex flex-col gap-5 rounded-[16px] border-[0.5px] bg-white/[0.02] px-4 py-6">
      <div className="flex justify-between">
        <p className="font-azeret text-[0.688rem] tracking-[-0.04em] text-[#B9B9B9]">
          Address
        </p>
        <div className="flex items-center gap-2">
          <p className="ml-2 text-xs">{formatAddress(props.address)} </p>
          <Link
            href={`https://arbiscan.io/token/${props.address}`}
            target="_blank"
            rel="noreferrer"
          >
            <LuExternalLink className="h-3 w-3 cursor-pointer text-muted-foreground" />
          </Link>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="font-azeret text-[0.688rem] tracking-[-0.04em] text-[#B9B9B9]">
          Total Supply
        </p>
        <p className="text-xs">
          {props.totalSupply} {props.symbol}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="font-azeret text-[0.688rem] tracking-[-0.04em] text-[#B9B9B9]">
          Circulating Supply
        </p>
        <p className="text-xs">N/A</p>
      </div>
      <div className="flex justify-between">
        <p className="font-azeret text-[0.688rem] tracking-[-0.04em] text-[#B9B9B9]">
          All Time High
        </p>
        <p className="text-xs">N/A</p>
      </div>
      <div className="flex justify-between">
        <p className="font-azeret text-[0.688rem] tracking-[-0.04em] text-[#B9B9B9]">
          All Time Low
        </p>
        <p className="text-xs">N/A</p>
      </div>
    </div>
  );
}
