import { notFound } from "next/navigation";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "../actions";
import { ProductStatsFields } from "../ProductStatsFields";

type Stat = { label: string; value: string };

const inputClasses =
  "w-full bg-carbon border border-white/10 rounded-xl px-6 py-4 text-cloud focus:outline-none focus:border-cloud/50 focus:ring-1 focus:ring-cloud/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20";
const labelClasses = "text-sm font-bold tracking-wide uppercase text-slate block mb-2";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const stats = (Array.isArray(product.stats) ? product.stats : []) as Stat[];
  const updateWithId = updateProduct.bind(null, product.id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Edit Product</h1>
      <p className="text-silver mb-10">{product.name}</p>

      <form action={updateWithId} className="flex flex-col gap-6 max-w-[640px]">
        <div>
          <label className={labelClasses}>Name</label>
          <input name="name" type="text" required defaultValue={product.name} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Tagline</label>
          <input name="tagline" type="text" required defaultValue={product.tagline} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Description</label>
          <textarea name="description" required rows={4} defaultValue={product.description} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Product URL</label>
          <input name="url" type="url" defaultValue={product.url ?? ""} placeholder="https://…" className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Status</label>
          <select name="status" defaultValue={product.status} className={inputClasses}>
            <option value="live">Live</option>
            <option value="beta">Beta</option>
            <option value="coming-soon">Coming soon</option>
          </select>
        </div>

        <ProductStatsFields defaultStats={stats} />

        <SubmitButton className="w-fit" pendingText="Saving…">
          Save Changes
        </SubmitButton>
      </form>
    </div>
  );
}
