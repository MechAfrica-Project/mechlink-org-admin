import { notFound } from "next/navigation";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { prisma } from "@/lib/prisma";
import { ServiceFields } from "../ServiceFields";
import { updateService } from "../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  const updateWithId = updateService.bind(null, service.id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Edit Service</h1>
      <p className="text-silver mb-10">{service.title}</p>

      <form action={updateWithId} className="flex flex-col gap-8">
        <ServiceFields
          defaultValues={{
            title: service.title,
            desc: service.desc,
            iconName: service.iconName,
            order: service.order,
          }}
        />
        <SubmitButton className="w-fit" pendingText="Saving…">
          Save Changes
        </SubmitButton>
      </form>
    </div>
  );
}
