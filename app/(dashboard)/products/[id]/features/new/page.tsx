import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { FeatureFields } from "../FeatureFields";
import { createFeature } from "../actions";

export default async function NewFeaturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const createWithProduct = createFeature.bind(null, id);

  return (
    <div>
      <Link href={`/products/${id}`} className="inline-flex items-center gap-2 text-silver hover:text-cloud transition-colors text-sm mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to product
      </Link>
      <h1 className="text-3xl font-bold text-cloud tracking-tight mb-2">Add Feature Card</h1>
      <p className="text-silver mb-10">A card in the product&apos;s feature gallery on the homepage.</p>

      <form action={createWithProduct} className="flex flex-col gap-8">
        <FeatureFields />
        <SubmitButton className="w-fit" pendingText="Creating…">
          Create
        </SubmitButton>
      </form>
    </div>
  );
}
