import Image from "next/image";

const inputClasses =
  "w-full bg-carbon border border-white/10 rounded-xl px-6 py-4 text-cloud focus:outline-none focus:border-cloud/50 focus:ring-1 focus:ring-cloud/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20";
const labelClasses = "text-sm font-bold tracking-wide uppercase text-slate block mb-2";

export function TeamMemberFields({
  defaultValues,
}: {
  defaultValues?: {
    name: string;
    title: string;
    bio: string;
    initials: string;
    linkedin: string;
    photoUrl: string | null;
  };
}) {
  return (
    <div className="flex flex-col gap-6 max-w-[560px]">
      {defaultValues?.photoUrl && (
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-steel">
          <Image src={defaultValues.photoUrl} alt="Current photo" fill sizes="80px" className="object-cover" />
        </div>
      )}

      <div>
        <label className={labelClasses}>Photo {defaultValues ? "(replace)" : ""}</label>
        <input type="file" name="photo" accept="image/*" className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Name</label>
        <input name="name" required defaultValue={defaultValues?.name} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Title</label>
        <input
          name="title"
          required
          placeholder="e.g. Co-Founder & CEO"
          defaultValue={defaultValues?.title}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Bio</label>
        <textarea
          name="bio"
          required
          rows={3}
          defaultValue={defaultValues?.bio}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Initials (avatar fallback)</label>
        <input
          name="initials"
          maxLength={3}
          placeholder="e.g. EO"
          defaultValue={defaultValues?.initials}
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>LinkedIn URL (optional)</label>
        <input
          name="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/..."
          defaultValue={defaultValues?.linkedin}
          className={inputClasses}
        />
      </div>
    </div>
  );
}
