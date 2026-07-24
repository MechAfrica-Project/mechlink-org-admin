"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updateSiteSettings(formData: FormData) {
  const contactEmail = String(formData.get("contactEmail") ?? "").trim();
  const careersEmail = String(formData.get("careersEmail") ?? "").trim();
  const linkedinUrl = String(formData.get("linkedinUrl") ?? "").trim();
  const twitterUrl = String(formData.get("twitterUrl") ?? "").trim();

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: { contactEmail, careersEmail, linkedinUrl, twitterUrl },
    create: { id: "singleton", contactEmail, careersEmail, linkedinUrl, twitterUrl },
  });

  // These values are read on nearly every public page (Footer, homepage, careers).
  revalidatePath("/", "layout");
}
