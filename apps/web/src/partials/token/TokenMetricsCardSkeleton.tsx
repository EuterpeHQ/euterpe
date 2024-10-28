import { Skeleton } from "@/components/ui/skeleton";

export default function TokenMetricsSkeleton() {
  return (
    <div className="flex flex-col gap-5 rounded-[16px] border-[0.5px] bg-white/[0.02] px-4 py-6">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}
