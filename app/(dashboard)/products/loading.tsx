import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <div>
      <Skeleton className="h-9 w-40 mb-3" />
      <Skeleton className="h-4 w-96 max-w-full mb-10" />

      <div className="border-t border-steel/20">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-start justify-between gap-4 py-5 border-b border-steel/20">
            <div className="w-full">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-60 mb-3" />
              <div className="flex gap-5">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
