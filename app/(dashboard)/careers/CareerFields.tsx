import { inputClasses, labelClasses } from "@/components/ui/form";

export function CareerFields({
  defaultValues,
}: {
  defaultValues?: {
    title: string;
    department: string;
    location: string;
    type: string;
    descriptionMd: string;
    isOpen: boolean;
  };
}) {
  return (
    <div className="flex flex-col gap-6 max-w-[640px]">
      <div>
        <label className={labelClasses}>Title</label>
        <input name="title" type="text" required defaultValue={defaultValues?.title} className={inputClasses} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClasses}>Department</label>
          <input name="department" type="text" required defaultValue={defaultValues?.department} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Location</label>
          <input name="location" type="text" required defaultValue={defaultValues?.location} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Type</label>
          <input name="type" type="text" required defaultValue={defaultValues?.type} placeholder="Full-time" className={inputClasses} />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Description (Markdown)</label>
        <textarea
          name="descriptionMd"
          required
          rows={12}
          defaultValue={defaultValues?.descriptionMd}
          placeholder={"## About the role\n\n- Responsibility one\n- Responsibility two"}
          className={`${inputClasses} font-mono text-sm`}
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input name="isOpen" type="checkbox" defaultChecked={defaultValues?.isOpen ?? true} className="w-5 h-5 accent-accent-primary" />
        <span className="text-cloud font-medium">Open (visible on the public careers page)</span>
      </label>
    </div>
  );
}
