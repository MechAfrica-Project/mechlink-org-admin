"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parse(formData: FormData) {
  return {
    quote: String(formData.get("quote") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    iconName: String(formData.get("iconName") ?? "Boxes").trim(),
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createTestimonial(formData: FormData) {
  await prisma.testimonial.create({ data: parse(formData) });
  revalidatePath("/testimonials");
  redirect("/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await prisma.testimonial.update({ where: { id }, data: parse(formData) });
  revalidatePath("/testimonials");
  redirect("/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/testimonials");
}
