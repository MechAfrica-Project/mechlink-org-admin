import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteFaq } from "./actions";

export default async function FaqPage() {
  const faqs = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">FAQ</h1>
          <p className="text-silver">Questions shown on the public /faq page.</p>
        </div>
        <Link
          href="/faq/new"
          className="inline-flex items-center gap-2 bg-accent-primary text-void font-bold uppercase text-sm tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </Link>
      </div>

      <div className="border-t border-steel/20">
        {faqs.length === 0 && <p className="text-silver py-8">No questions yet.</p>}

        {faqs.map((faq) => (
          <div key={faq.id} className="flex items-start justify-between gap-4 py-5 border-b border-steel/20">
            <div className="max-w-[640px]">
              <p className="font-bold text-cloud">{faq.question}</p>
              <p className="text-sm text-silver mt-1 line-clamp-2">{faq.answer}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/faq/${faq.id}`}
                className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-cloud hover:border-cloud transition-colors"
                aria-label="Edit question"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <form action={deleteFaq.bind(null, faq.id)}>
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-red-500 hover:border-red-500/40 transition-colors cursor-pointer"
                  aria-label="Delete question"
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
