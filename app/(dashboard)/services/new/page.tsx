import { SubmitButton } from "@/components/ui/SubmitButton";
import { ServiceFields } from "../ServiceFields";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Add Service</h1>
      <p className="text-silver mb-10">Appears in the services grid on the homepage.</p>

      <form action={createService} className="flex flex-col gap-8">
        <ServiceFields />
        <SubmitButton className="w-fit" pendingText="Creating…">
          Create
        </SubmitButton>
      </form>
    </div>
  );
}
