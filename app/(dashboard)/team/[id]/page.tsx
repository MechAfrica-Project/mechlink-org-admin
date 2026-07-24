import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { TeamMemberFields } from "../TeamMemberFields";
import { updateTeamMember } from "../actions";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  const updateWithId = updateTeamMember.bind(null, member.id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Edit Team Member</h1>
      <p className="text-silver mb-10">{member.name}</p>

      <form action={updateWithId} className="flex flex-col gap-8">
        <TeamMemberFields
          defaultValues={{
            name: member.name,
            title: member.title,
            bio: member.bio,
            initials: member.initials,
            linkedin: member.linkedin ?? "",
            photoUrl: member.photoUrl,
          }}
        />
        <Button type="submit" className="w-fit">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
