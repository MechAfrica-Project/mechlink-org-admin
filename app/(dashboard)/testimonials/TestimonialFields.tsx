import { inputClasses, labelClasses, ICON_NAMES } from "@/components/ui/form";

export function TestimonialFields({
  defaultValues,
}: {
  defaultValues?: { quote: string; name: string; role: string; iconName: string; order: number };
}) {
  return (
    <div className="flex flex-col gap-6 max-w-[560px]">
      <div>
        <label className={labelClasses}>Quote</label>
        <textarea name="quote" required rows={4} defaultValue={defaultValues?.quote} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Name</label>
        <input name="name" type="text" required defaultValue={defaultValues?.name} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Role / Pillar</label>
        <input name="role" type="text" required defaultValue={defaultValues?.role} placeholder="Product · Services · Talent" className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Icon</label>
        <select name="iconName" defaultValue={defaultValues?.iconName ?? "Boxes"} className={inputClasses}>
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
