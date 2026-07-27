"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

async function uploadImageIfProvided(formData: FormData): Promise<string | undefined> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return undefined;
  const blob = await put(`features/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
}

function parseFields(formData: FormData) {
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return {
    title: String(formData.get("title") ?? "").trim(),
    tags,
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createFeature(productId: string, formData: FormData) {
  const data = parseFields(formData);
  const imageUrl = await uploadImageIfProvided(formData);
  await prisma.project.create({ data: { ...data, imageUrl: imageUrl ?? null, productId } });
  revalidatePath(`/products/${productId}`);
  redirect(`/products/${productId}`);
}

export async function updateFeature(id: string, productId: string, formData: FormData) {
  const data = parseFields(formData);
  const imageUrl = await uploadImageIfProvided(formData);
  await prisma.project.update({
    where: { id },
    data: { ...data, ...(imageUrl ? { imageUrl } : {}) },
  });
  revalidatePath(`/products/${productId}`);
  redirect(`/products/${productId}`);
}

export async function deleteFeature(id: string, productId: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath(`/products/${productId}`);
}
