"use server";
import prisma from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import { createNoteSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export async function createNotePosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { title, writerName, socialMediaUrl, category, description } = createNoteSchema.parse(values);
  console.log(values);

  const slug = `${toSlug(writerName || "untitled")}-${nanoid(10)}`;

  await prisma.notes.create({
    data: {
      slug,
      title,
      writerName: writerName.trim(),
      socialMediaUrl: (socialMediaUrl as string | undefined) || "",
      category: (category as string | undefined) || "",
      description: description.trim() || "",
    },
  });

  redirect("/note-submitted");
}