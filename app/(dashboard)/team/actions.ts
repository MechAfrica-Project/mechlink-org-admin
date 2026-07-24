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

async function uploadPhotoIfProvided(formData: FormData): Promise<string | undefined> {
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const blob = await put(`team/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
}

export async function createTeamMember(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const linkedin = String(formData.get("linkedin") ?? "").trim();
  const initials = String(formData.get("initials") ?? "")
    .trim()
    .toUpperCase()
    .slice(0, 3) || name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  const photoUrl = await uploadPhotoIfProvided(formData);

  const count = await prisma.teamMember.count();

  await prisma.teamMember.create({
    data: {
      slug: slugify(name),
      name,
      title,
      bio,
      initials,
      linkedin: linkedin || null,
      photoUrl: photoUrl ?? null,
      order: count,
    },
  });

  revalidatePath("/team");
  revalidatePath("/team");
  redirect("/team");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const linkedin = String(formData.get("linkedin") ?? "").trim();
  const initials = String(formData.get("initials") ?? "").trim().toUpperCase().slice(0, 3);

  const photoUrl = await uploadPhotoIfProvided(formData);

  await prisma.teamMember.update({
    where: { id },
    data: {
      name,
      title,
      bio,
      initials,
      linkedin: linkedin || null,
      ...(photoUrl ? { photoUrl } : {}),
    },
  });

  revalidatePath("/team");
  revalidatePath("/team");
  redirect("/team");
}

export async function deleteTeamMember(id: string) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/team");
  revalidatePath("/team");
}
