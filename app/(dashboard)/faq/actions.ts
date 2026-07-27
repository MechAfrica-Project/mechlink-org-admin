"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parse(formData: FormData) {
  return {
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createFaq(formData: FormData) {
  await prisma.faqItem.create({ data: parse(formData) });
  revalidatePath("/faq");
  redirect("/faq");
}

export async function updateFaq(id: string, formData: FormData) {
  await prisma.faqItem.update({ where: { id }, data: parse(formData) });
  revalidatePath("/faq");
  redirect("/faq");
}

export async function deleteFaq(id: string) {
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/faq");
}
