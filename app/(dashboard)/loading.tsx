import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div>
      <Skeleton className="h-9 w-44 mb-3" />
      <Skeleton className="h-4 w-56 mb-10" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl border border-steel bg-carbon">
            <Skeleton className="w-6 h-6 rounded-lg" />
            <div>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
