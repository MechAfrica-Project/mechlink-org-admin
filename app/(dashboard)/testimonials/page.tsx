import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "./actions";

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Testimonials</h1>
          <p className="text-silver">The pillar cards in the &quot;flywheel&quot; slider on the homepage.</p>
        </div>
        <Link
          href="/testimonials/new"
          className="inline-flex items-center gap-2 bg-accent-primary text-void font-bold uppercase text-sm tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Link>
      </div>

      <div className="border-t border-steel/20">
        {testimonials.length === 0 && <p className="text-silver py-8">No testimonials yet.</p>}

        {testimonials.map((t) => (
          <div key={t.id} className="flex items-start justify-between gap-4 py-5 border-b border-steel/20">
            <div className="max-w-[560px]">
              <p className="text-cloud leading-relaxed">&quot;{t.quote}&quot;</p>
              <p className="text-sm text-silver mt-2">
                <span className="font-bold text-cloud">{t.name}</span> · {t.role} · icon {t.iconName}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/testimonials/${t.id}`}
                className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-cloud hover:border-cloud transition-colors"
                aria-label={`Edit ${t.name}`}
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <form action={deleteTestimonial.bind(null, t.id)}>
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-red-500 hover:border-red-500/40 transition-colors cursor-pointer"
                  aria-label={`Delete ${t.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
