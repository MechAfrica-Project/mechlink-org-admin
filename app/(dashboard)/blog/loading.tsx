import { Skeleton } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <Skeleton className="h-9 w-20 mb-3" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-12 w-36 rounded-full" />
      </div>
      <div className="border-t border-steel/20">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between gap-4 py-5 border-b border-steel/20">
            <div className="flex items-center gap-4 w-full">
              <Skeleton className="w-16 h-12 rounded-lg shrink-0" />
              <div className="w-full">
                <Skeleton className="h-5 w-64 mb-2" />
                <Skeleton className="h-4 w-40" />
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
