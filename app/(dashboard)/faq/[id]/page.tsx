import { notFound } from "next/navigation";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { prisma } from "@/lib/prisma";
import { FaqFields } from "../FaqFields";
import { updateFaq } from "../actions";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await prisma.faqItem.findUnique({ where: { id } });
  if (!faq) notFound();

  const updateWithId = updateFaq.bind(null, faq.id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Edit Question</h1>
      <p className="text-silver mb-10 line-clamp-1">{faq.question}</p>

      <form action={updateWithId} className="flex flex-col gap-8">
        <FaqFields defaultValues={{ question: faq.question, answer: faq.answer, order: faq.order }} />
        <SubmitButton className="w-fit" pendingText="Saving…">
          Save Changes
        </SubmitButton>
      </form>
    </div>
  );
}
