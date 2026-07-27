import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "../actions";
import { ProductStatsFields } from "../ProductStatsFields";
import { deleteFeature } from "./features/actions";

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
  const product = await prisma.product.findUnique({
    where: { id },
    include: { features: { orderBy: { order: "asc" } } },
  });
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

      {/* Feature cards — the gallery shown under this product on the homepage. */}
      <div className="mt-16 pt-10 border-t border-steel/30 max-w-[640px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-cloud">Feature cards</h2>
            <p className="text-sm text-silver mt-1">The scrolling gallery beneath this product on the homepage.</p>
          </div>
          <Link
            href={`/products/${product.id}/features/new`}
            className="inline-flex items-center gap-2 bg-accent-primary text-void font-bold uppercase text-xs tracking-widest px-4 py-2.5 rounded-full hover:scale-105 transition-transform shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add
          </Link>
        </div>

        <div className="border-t border-steel/20">
          {product.features.length === 0 && <p className="text-silver py-6 text-sm">No feature cards yet.</p>}

          {product.features.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between gap-4 py-4 border-b border-steel/20">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-14 h-11 rounded-lg overflow-hidden bg-graphite border border-steel shrink-0">
                  {feature.imageUrl && (
                    <Image src={feature.imageUrl} alt={feature.title} fill sizes="56px" className="object-cover" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-cloud truncate">{feature.title}</p>
                  <p className="text-xs text-silver truncate">{feature.tags.join(" · ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/products/${product.id}/features/${feature.id}`}
                  className="w-9 h-9 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-cloud hover:border-cloud transition-colors"
                  aria-label={`Edit ${feature.title}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Link>
                <form action={deleteFeature.bind(null, feature.id, product.id)}>
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-red-500 hover:border-red-500/40 transition-colors cursor-pointer"
                    aria-label={`Delete ${feature.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
