import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteCareerRole } from "./actions";

export default async function CareersPage() {
  const roles = await prisma.careerRole.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Careers</h1>
          <p className="text-silver">Open roles listed on the public /careers page.</p>
        </div>
        <Link
          href="/careers/new"
          className="inline-flex items-center gap-2 bg-accent-primary text-void font-bold uppercase text-sm tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          Add Role
        </Link>
      </div>

      <div className="border-t border-steel/20">
        {roles.length === 0 && <p className="text-silver py-8">No roles yet.</p>}

        {roles.map((role) => (
          <div key={role.id} className="flex items-start justify-between gap-4 py-5 border-b border-steel/20">
            <div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-cloud">{role.title}</p>
                {!role.isOpen && (
                  <span className="text-xs font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-steel/40 text-silver">
                    Closed
                  </span>
                )}
              </div>
              <p className="text-sm text-silver mt-0.5">
                {role.department} · {role.location} · {role.type}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/careers/${role.id}`}
                className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-cloud hover:border-cloud transition-colors"
                aria-label={`Edit ${role.title}`}
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <form action={deleteCareerRole.bind(null, role.id)}>
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-red-500 hover:border-red-500/40 transition-colors cursor-pointer"
                  aria-label={`Delete ${role.title}`}
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
