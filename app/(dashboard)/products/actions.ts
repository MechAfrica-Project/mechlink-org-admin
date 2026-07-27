"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function updateProduct(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const status = String(formData.get("status") ?? "live").trim();

  // Stats arrive as parallel arrays; zip and drop rows where either side is blank.
  const labels = formData.getAll("statLabel").map((v) => String(v).trim());
  const values = formData.getAll("statValue").map((v) => String(v).trim());
  const stats = labels
    .map((label, i) => ({ label, value: values[i] ?? "" }))
    .filter((s) => s.label && s.value);

  await prisma.product.update({
    where: { id },
    data: {
      name,
      tagline,
      description,
      url: url || null,
      status,
      stats,
    },
  });

  // Refreshes the admin's own product pages. The public site reads this product
  // too, but it's a separate deployment and picks the change up via its own ISR.
  revalidatePath("/products");
  redirect("/products");
}
