import { Skeleton } from "@/components/ui/Skeleton";

export default function FaqLoading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <Skeleton className="h-9 w-20 mb-3" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
      <div className="border-t border-steel/20">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-start justify-between gap-4 py-5 border-b border-steel/20">
            <div className="w-full max-w-[640px]">
              <Skeleton className="h-5 w-2/3 mb-2" />
              <Skeleton className="h-4 w-full" />
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
