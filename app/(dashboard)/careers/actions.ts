"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parse(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    department: String(formData.get("department") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    type: String(formData.get("type") ?? "").trim(),
    descriptionMd: String(formData.get("descriptionMd") ?? "").trim(),
    isOpen: formData.get("isOpen") === "on",
  };
}

export async function createCareerRole(formData: FormData) {
  const data = parse(formData);
  await prisma.careerRole.create({ data: { ...data, slug: slugify(data.title) } });
  revalidatePath("/careers");
  redirect("/careers");
}

export async function updateCareerRole(id: string, formData: FormData) {
  const data = parse(formData);
  // Regenerate the slug from the title so public URLs stay readable.
  await prisma.careerRole.update({ where: { id }, data: { ...data, slug: slugify(data.title) } });
  revalidatePath("/careers");
  redirect("/careers");
}

export async function deleteCareerRole(id: string) {
  await prisma.careerRole.delete({ where: { id } });
  revalidatePath("/careers");
}
