import { inputClasses, labelClasses, ICON_NAMES } from "@/components/ui/form";

export function ServiceFields({
  defaultValues,
}: {
  defaultValues?: { title: string; desc: string; iconName: string; order: number };
}) {
  return (
    <div className="flex flex-col gap-6 max-w-[560px]">
      <div>
        <label className={labelClasses}>Title</label>
        <input name="title" type="text" required defaultValue={defaultValues?.title} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Description</label>
        <textarea name="desc" required rows={3} defaultValue={defaultValues?.desc} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Icon</label>
        <select name="iconName" defaultValue={defaultValues?.iconName ?? "Code2"} className={inputClasses}>
          {ICON_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasses}>Order</label>
        <input name="order" type="number" defaultValue={defaultValues?.order ?? 0} className={inputClasses} />
      </div>
    </div>
  );
}
