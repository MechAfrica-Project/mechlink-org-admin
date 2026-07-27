import Link from "next/link";
import { Pencil, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";

type Stat = { label: string; value: string };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Products</h1>
      <p className="text-silver mb-10">
        Copy and headline stats shown in the product sections of the public site.
      </p>

      <div className="border-t border-steel/20">
        {products.length === 0 && <p className="text-silver py-8">No products yet.</p>}

        {products.map((product) => {
          const stats = (Array.isArray(product.stats) ? product.stats : []) as Stat[];
          return (
            <div key={product.id} className="flex items-start justify-between gap-4 py-5 border-b border-steel/20">
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-cloud">{product.name}</p>
                  <span className="text-xs font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-accent-primary/15 text-accent-primary">
                    {product.status}
                  </span>
                </div>
                <p className="text-sm text-silver mt-0.5">{product.tagline}</p>
                {stats.length > 0 && (
                  <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
                    {stats.map((s) => (
                      <span key={s.label} className="text-xs text-silver">
                        <span className="font-bold text-cloud">{s.value}</span> {s.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {product.url && (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-cloud hover:border-cloud transition-colors"
                    aria-label={`Visit ${product.name}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <Link
                  href={`/products/${product.id}`}
                  className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-cloud hover:border-cloud transition-colors"
                  aria-label={`Edit ${product.name}`}
                >
                  <Pencil className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
