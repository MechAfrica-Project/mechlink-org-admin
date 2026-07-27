import { SubmitButton } from "@/components/ui/SubmitButton";
import { FaqFields } from "../FaqFields";
import { createFaq } from "../actions";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Add Question</h1>
      <p className="text-silver mb-10">Appears on the public /faq page.</p>

      <form action={createFaq} className="flex flex-col gap-8">
        <FaqFields />
        <SubmitButton className="w-fit" pendingText="Creating…">
          Create
        </SubmitButton>
      </form>
    </div>
  );
}
