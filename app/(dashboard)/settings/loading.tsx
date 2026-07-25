import { Skeleton } from "@/components/ui/Skeleton";

export default function SettingsLoading() {
  return (
    <div>
      <Skeleton className="h-9 w-36 mb-3" />
      <Skeleton className="h-4 w-96 max-w-full mb-10" />

      <div className="flex flex-col gap-6 max-w-[560px]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        ))}
        <Skeleton className="h-14 w-40 rounded-full" />
      </div>
    </div>
  );
}
