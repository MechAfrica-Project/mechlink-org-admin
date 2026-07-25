import { Skeleton } from "@/components/ui/Skeleton";

export default function TeamLoading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <Skeleton className="h-9 w-28 mb-3" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>

      <div className="border-t border-steel/20">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between py-5 border-b border-steel/20">
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-full shrink-0" />
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
