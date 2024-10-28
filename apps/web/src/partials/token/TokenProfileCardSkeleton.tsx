import { Skeleton } from "@/components/ui/skeleton";

export default function TokenProfileCardSkeleton() {
  return (
    <div className="flex flex-col rounded-[16px] border-[0.5px] bg-white/[0.02] px-4 py-6">
      <Skeleton>
        <div className="invisible flex flex-col">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10" />
              <div className="flex flex-col gap-2">
                <h2 className="font-bold leading-none"></h2>
                <h2 className="text-xs font-medium uppercase leading-none text-muted-foreground"></h2>
              </div>
            </div>
            <p className="w-fit bg-primary/10 px-2 py-1.5 text-xs text-primary">
              7.156k Holders
            </p>
          </div>
          <div className="mt-4 flex gap-[58px]">
            <div className="flex flex-col gap-1">
              <p className="font-azeret text-xs tracking-[-0.04em] text-muted-foreground">
                Price
              </p>
              <p className="text-xs font-medium">$0.003720</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-azeret text-[0.688rem] tracking-[-0.04em] text-muted-foreground">
                Market Cap
              </p>
              <p className="text-xs font-medium">$126k</p>
            </div>
          </div>
        </div>
      </Skeleton>
      <div className="mt-5 flex gap-4">
        <Skeleton className="flex h-12 items-center px-9">
          <div className="invisible">
            <p className="text-center font-azeret text-[0.688rem] text-[#747474]">
              5m
            </p>
            <p className="text-center text-xs font-medium text-[#36FF87]">
              +3.90%
            </p>
          </div>
        </Skeleton>
        <Skeleton className="flex h-12 items-center px-9">
          <div className="invisible">
            <p className="text-center font-azeret text-[0.688rem] text-[#747474]">
              1H
            </p>
            <p className="text-center text-xs font-medium text-[#36FF87]">
              -1.64%
            </p>
          </div>
        </Skeleton>
        <Skeleton className="flex h-12 items-center px-9">
          <div className="invisible">
            <p className="text-center font-azeret text-[0.688rem] text-[#747474]">
              24H
            </p>
            <p className="text-center text-xs font-medium text-[#36FF87]">
              +12.81%
            </p>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}
