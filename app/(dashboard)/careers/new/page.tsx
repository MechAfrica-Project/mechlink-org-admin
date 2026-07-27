import { SubmitButton } from "@/components/ui/SubmitButton";
import { CareerFields } from "../CareerFields";
import { createCareerRole } from "../actions";

export default function NewCareerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Add Role</h1>
      <p className="text-silver mb-10">A new opening on the public careers page.</p>

      <form action={createCareerRole} className="flex flex-col gap-8">
        <CareerFields />
        <SubmitButton className="w-fit" pendingText="Creating…">
          Create
        </SubmitButton>
      </form>
    </div>
  );
}
