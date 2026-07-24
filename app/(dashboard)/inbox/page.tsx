import { Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateSubmissionStatus, deleteSubmission } from "./actions";

const statusStyles: Record<string, string> = {
  new: "bg-accent-primary/15 text-accent-primary",
  read: "bg-steel/40 text-silver",
  replied: "bg-blue-500/15 text-blue-500",
  archived: "bg-steel/20 text-silver/60",
};

export default async function AdminInboxPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Inbox</h1>
      <p className="text-silver mb-10">Contact form submissions from the public site.</p>

      <div className="flex flex-col gap-4">
        {submissions.length === 0 && (
          <p className="text-silver py-8">No submissions yet.</p>
        )}

        {submissions.map((s) => (
          <div key={s.id} className="p-6 rounded-2xl border border-steel bg-carbon">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-bold text-cloud">{s.name}</p>
                <a href={`mailto:${s.email}`} className="text-sm text-silver hover:text-accent-primary transition-colors">
                  {s.email}
                </a>
                {s.phone && <p className="text-sm text-silver">{s.phone}</p>}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full ${statusStyles[s.status] ?? statusStyles.new}`}>
                  {s.status}
                </span>
                <p className="text-xs text-silver/60">{s.createdAt.toLocaleDateString()}</p>
              </div>
            </div>

            {s.message && <p className="text-silver leading-relaxed mb-4">{s.message}</p>}

            <div className="flex flex-wrap gap-2 mb-4">
              {s.context.map((c) => (
                <span key={c} className="text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full border border-steel text-silver">
                  {c}
                </span>
              ))}
              {s.budget && (
                <span className="text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full border border-steel text-silver">
                  {s.budget}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-steel/30">
              {["new", "read", "replied", "archived"].map((status) => (
                <form key={status} action={updateSubmissionStatus.bind(null, s.id, status)}>
                  <button
                    type="submit"
                    disabled={s.status === status}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-steel/40 text-silver hover:text-cloud hover:border-cloud transition-colors disabled:opacity-40 disabled:cursor-default cursor-pointer capitalize"
                  >
                    Mark {status}
                  </button>
                </form>
              ))}

              <form action={deleteSubmission.bind(null, s.id)} className="ml-auto">
                <button
                  type="submit"
                  className="w-9 h-9 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-red-500 hover:border-red-500/40 transition-colors cursor-pointer"
                  aria-label="Delete submission"
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
