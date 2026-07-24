import { Button } from "@/components/ui/Button";
import { TeamMemberFields } from "../TeamMemberFields";
import { createTeamMember } from "../actions";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Add Team Member</h1>
      <p className="text-silver mb-10">This person will appear on the public /team page.</p>

      <form action={createTeamMember} className="flex flex-col gap-8">
        <TeamMemberFields />
        <Button type="submit" className="w-fit">
          Create
        </Button>
      </form>
    </div>
  );
}
