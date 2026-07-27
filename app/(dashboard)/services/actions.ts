"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parse(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    desc: String(formData.get("desc") ?? "").trim(),
    iconName: String(formData.get("iconName") ?? "Boxes").trim(),
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createService(formData: FormData) {
  await prisma.service.create({ data: parse(formData) });
  revalidatePath("/services");
  redirect("/services");
}

export async function updateService(id: string, formData: FormData) {
  await prisma.service.update({ where: { id }, data: parse(formData) });
  revalidatePath("/services");
  redirect("/services");
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
}
