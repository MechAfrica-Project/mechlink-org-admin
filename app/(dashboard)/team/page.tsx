import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteTeamMember } from "./actions";

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Team</h1>
          <p className="text-silver">Manage who appears on the public /team page.</p>
        </div>
        <Link
          href="/team/new"
          className="inline-flex items-center gap-2 bg-accent-primary text-void font-bold uppercase text-sm tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </Link>
      </div>

      <div className="border-t border-steel/20">
        {members.length === 0 && (
          <p className="text-silver py-8">No team members yet.</p>
        )}

        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between py-5 border-b border-steel/20"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-graphite border border-steel flex items-center justify-center shrink-0">
                {member.photoUrl ? (
                  <Image src={member.photoUrl} alt={member.name} fill sizes="48px" className="object-cover" />
                ) : (
                  <span className="text-xs font-black text-accent-primary">{member.initials}</span>
                )}
              </div>
              <div>
                <p className="font-bold text-cloud">{member.name}</p>
                <p className="text-sm text-silver">{member.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/team/${member.id}`}
                className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-cloud hover:border-cloud transition-colors"
                aria-label={`Edit ${member.name}`}
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <form action={deleteTeamMember.bind(null, member.id)}>
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center text-silver hover:text-red-500 hover:border-red-500/40 transition-colors cursor-pointer"
                  aria-label={`Delete ${member.name}`}
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
