import Image from "next/image";
import { inputClasses, labelClasses } from "@/components/ui/form";

export function FeatureFields({
  defaultValues,
}: {
  defaultValues?: { title: string; tags: string[]; imageUrl: string | null; order: number };
}) {
  return (
    <div className="flex flex-col gap-6 max-w-[560px]">
      <div>
        <label className={labelClasses}>Title</label>
        <input name="title" type="text" required defaultValue={defaultValues?.title} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Tags (comma-separated)</label>
        <input
          name="tags"
          type="text"
          defaultValue={defaultValues?.tags.join(", ")}
          placeholder="Mechanization, Crop Care, Logistics"
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Image</label>
        {defaultValues?.imageUrl && (
          <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden border border-steel mb-3">
            <Image src={defaultValues.imageUrl} alt="Current image" fill sizes="280px" className="object-cover" />
          </div>
        )}
        <input name="image" type="file" accept="image/*" className="text-silver text-sm" />
        <p className="text-xs text-silver/60 mt-2">Leave empty to keep the current image.</p>
      </div>

      <div>
        <label className={labelClasses}>Order</label>
        <input name="order" type="number" defaultValue={defaultValues?.order ?? 0} className={inputClasses} />
      </div>
    </div>
  );
}
