import { notFound } from "next/navigation";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { prisma } from "@/lib/prisma";
import { TestimonialFields } from "../TestimonialFields";
import { updateTestimonial } from "../actions";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) notFound();

  const updateWithId = updateTestimonial.bind(null, t.id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Edit Testimonial</h1>
      <p className="text-silver mb-10">{t.name}</p>

      <form action={updateWithId} className="flex flex-col gap-8">
        <TestimonialFields
          defaultValues={{ quote: t.quote, name: t.name, role: t.role, iconName: t.iconName, order: t.order }}
        />
        <SubmitButton className="w-fit" pendingText="Saving…">
          Save Changes
        </SubmitButton>
      </form>
    </div>
  );
}
