import { Button } from "@/components/ui/Button";
import { getSiteSettings } from "@/lib/site-settings";
import { updateSiteSettings } from "./actions";

const inputClasses =
  "w-full bg-carbon border border-white/10 rounded-xl px-6 py-4 text-cloud focus:outline-none focus:border-cloud/50 focus:ring-1 focus:ring-cloud/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20";
const labelClasses = "text-sm font-bold tracking-wide uppercase text-slate block mb-2";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Settings</h1>
      <p className="text-silver mb-10">
        Contact emails and social links used across the public site (footer, contact section, careers).
        Product URLs are managed per-product under Products.
      </p>

      <form action={updateSiteSettings} className="flex flex-col gap-6 max-w-[560px]">
        <div>
          <label className={labelClasses}>Contact Email</label>
          <input name="contactEmail" type="email" required defaultValue={settings.contactEmail} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Careers Email</label>
          <input name="careersEmail" type="email" required defaultValue={settings.careersEmail} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>LinkedIn URL</label>
          <input name="linkedinUrl" type="url" required defaultValue={settings.linkedinUrl} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Twitter / X URL</label>
          <input name="twitterUrl" type="url" required defaultValue={settings.twitterUrl} className={inputClasses} />
        </div>

        <Button type="submit" className="w-fit">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
