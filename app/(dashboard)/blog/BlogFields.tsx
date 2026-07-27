import Image from "next/image";
import { inputClasses, labelClasses } from "@/components/ui/form";

export function BlogFields({
  defaultValues,
}: {
  defaultValues?: {
    title: string;
    category: string;
    readTime: string;
    excerpt: string;
    contentMd: string;
    coverImageUrl: string | null;
    isFeatured: boolean;
  };
}) {
  return (
    <div className="flex flex-col gap-6 max-w-[760px]">
      <div>
        <label className={labelClasses}>Title</label>
        <input name="title" type="text" required defaultValue={defaultValues?.title} className={inputClasses} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>Category</label>
          <input name="category" type="text" required defaultValue={defaultValues?.category} placeholder="Engineering" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Read time</label>
          <input name="readTime" type="text" required defaultValue={defaultValues?.readTime} placeholder="6 min read" className={inputClasses} />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Excerpt</label>
        <textarea name="excerpt" required rows={2} defaultValue={defaultValues?.excerpt} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Cover image</label>
        {defaultValues?.coverImageUrl && (
          <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-xl overflow-hidden border border-steel mb-3">
            <Image src={defaultValues.coverImageUrl} alt="Current cover" fill sizes="320px" className="object-cover" />
          </div>
        )}
        <input name="cover" type="file" accept="image/*" className="text-silver text-sm" />
        <p className="text-xs text-silver/60 mt-2">Leave empty to keep the current image.</p>
      </div>

      <div>
        <label className={labelClasses}>Body (Markdown)</label>
        <textarea
          name="contentMd"
          required
          rows={18}
          defaultValue={defaultValues?.contentMd}
          placeholder={"## Section heading\n\nParagraph text with **bold** and _italics_.\n\n- Point one\n- Point two"}
          className={`${inputClasses} font-mono text-sm`}
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input name="isFeatured" type="checkbox" defaultChecked={defaultValues?.isFeatured ?? false} className="w-5 h-5 accent-accent-primary" />
        <span className="text-cloud font-medium">Featured (shown large at the top of the blog)</span>
      </label>
    </div>
  );
}
