import { inputClasses, labelClasses } from "@/components/ui/form";

export function FaqFields({
  defaultValues,
}: {
  defaultValues?: { question: string; answer: string; order: number };
}) {
  return (
    <div className="flex flex-col gap-6 max-w-[640px]">
      <div>
        <label className={labelClasses}>Question</label>
        <input name="question" type="text" required defaultValue={defaultValues?.question} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Answer</label>
        <textarea name="answer" required rows={5} defaultValue={defaultValues?.answer} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Order</label>
        <input name="order" type="number" defaultValue={defaultValues?.order ?? 0} className={inputClasses} />
      </div>
    </div>
  );
}
