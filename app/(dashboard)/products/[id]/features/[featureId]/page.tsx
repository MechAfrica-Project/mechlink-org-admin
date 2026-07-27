import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { prisma } from "@/lib/prisma";
import { FeatureFields } from "../FeatureFields";
import { updateFeature } from "../actions";

export default async function EditFeaturePage({
  params,
}: {
  params: Promise<{ id: string; featureId: string }>;
}) {
  const { id, featureId } = await params;
  const feature = await prisma.project.findUnique({ where: { id: featureId } });
  if (!feature || feature.productId !== id) notFound();

  const updateWithIds = updateFeature.bind(null, feature.id, id);

  return (
    <div>
      <Link href={`/products/${id}`} className="inline-flex items-center gap-2 text-silver hover:text-cloud transition-colors text-sm mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to product
      </Link>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Edit Feature Card</h1>
      <p className="text-silver mb-10">{feature.title}</p>

      <form action={updateWithIds} className="flex flex-col gap-8">
        <FeatureFields
          defaultValues={{ title: feature.title, tags: feature.tags, imageUrl: feature.imageUrl, order: feature.order }}
        />
        <SubmitButton className="w-fit" pendingText="Saving…">
          Save Changes
        </SubmitButton>
      </form>
    </div>
  );
}
