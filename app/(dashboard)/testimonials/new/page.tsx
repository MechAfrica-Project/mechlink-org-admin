import { SubmitButton } from "@/components/ui/SubmitButton";
import { TestimonialFields } from "../TestimonialFields";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Add Testimonial</h1>
      <p className="text-silver mb-10">Appears in the flywheel slider on the homepage.</p>

      <form action={createTestimonial} className="flex flex-col gap-8">
        <TestimonialFields />
        <SubmitButton className="w-fit" pendingText="Creating…">
          Create
        </SubmitButton>
      </form>
    </div>
  );
}
