import Link from "next/link";
import { Users, Inbox } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminHomePage() {
  const [teamCount, newSubmissions, totalSubmissions] = await Promise.all([
    prisma.teamMember.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.contactSubmission.count(),
  ]);

  const stats = [
    { label: "Team Members", value: teamCount, href: "/team", icon: Users },
    { label: "New Inquiries", value: newSubmissions, href: "/inbox", icon: Inbox },
    { label: "Total Inquiries", value: totalSubmissions, href: "/inbox", icon: Inbox },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Dashboard</h1>
      <p className="text-silver mb-10">Overview of the MechLink site.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="flex flex-col gap-4 p-6 rounded-2xl border border-steel bg-carbon hover:border-accent-primary/30 transition-colors"
          >
            <stat.icon className="w-6 h-6 text-accent-primary" strokeWidth={1.75} />
            <div>
              <p className="text-3xl font-black text-cloud tracking-tight">{stat.value}</p>
              <p className="text-sm text-silver mt-1">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
