import { notFound } from "next/navigation";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { prisma } from "@/lib/prisma";
import { CareerFields } from "../CareerFields";
import { updateCareerRole } from "../actions";

export default async function EditCareerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const role = await prisma.careerRole.findUnique({ where: { id } });
  if (!role) notFound();

  const updateWithId = updateCareerRole.bind(null, role.id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Edit Role</h1>
      <p className="text-silver mb-10">{role.title}</p>

      <form action={updateWithId} className="flex flex-col gap-8">
        <CareerFields
          defaultValues={{
            title: role.title,
            department: role.department,
            location: role.location,
            type: role.type,
            descriptionMd: role.descriptionMd,
            isOpen: role.isOpen,
          }}
        />
        <SubmitButton className="w-fit" pendingText="Saving…">
          Save Changes
        </SubmitButton>
      </form>
    </div>
  );
}
