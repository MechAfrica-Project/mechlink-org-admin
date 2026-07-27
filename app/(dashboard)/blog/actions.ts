"use server";

import { put } from "@vercel/blob";
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

async function uploadCoverIfProvided(formData: FormData): Promise<string | undefined> {
  const file = formData.get("cover");
  if (!(file instanceof File) || file.size === 0) return undefined;
  const blob = await put(`blog/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
}

function parseFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    readTime: String(formData.get("readTime") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    contentMd: String(formData.get("contentMd") ?? "").trim(),
    isFeatured: formData.get("isFeatured") === "on",
  };
}

export async function createBlogPost(formData: FormData) {
  const data = parseFields(formData);
  const coverImageUrl = await uploadCoverIfProvided(formData);
  await prisma.blogPost.create({
    data: { ...data, slug: slugify(data.title), coverImageUrl: coverImageUrl ?? null },
  });
  revalidatePath("/blog");
  redirect("/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const data = parseFields(formData);
  const coverImageUrl = await uploadCoverIfProvided(formData);
  await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      slug: slugify(data.title),
      // Only overwrite the cover when a new file was uploaded.
      ...(coverImageUrl ? { coverImageUrl } : {}),
    },
  });
  revalidatePath("/blog");
  redirect("/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
}
