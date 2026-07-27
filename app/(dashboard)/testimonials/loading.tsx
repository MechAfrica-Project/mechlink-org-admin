import { Skeleton } from "@/components/ui/Skeleton";

export default function TestimonialsLoading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <Skeleton className="h-9 w-44 mb-3" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-12 w-44 rounded-full" />
      </div>
      <div className="border-t border-steel/20">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-start justify-between gap-4 py-5 border-b border-steel/20">
            <div className="w-full max-w-[560px]">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-3" />
              <Skeleton className="h-3 w-40" />
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
