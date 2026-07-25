import { Skeleton } from "@/components/ui/Skeleton";

export default function InboxLoading() {
  return (
    <div>
      <Skeleton className="h-9 w-32 mb-3" />
      <Skeleton className="h-4 w-80 mb-10" />

      <div className="flex flex-col gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="p-6 rounded-2xl border border-steel bg-carbon">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Skeleton className="h-5 w-36 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex gap-2 pt-4 border-t border-steel/30">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
