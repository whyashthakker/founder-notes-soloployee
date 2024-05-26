"use server";

import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState = { error?: string } | undefined;

export async function approveSubmission(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const noteId = parseInt(formData.get("noteId") as string);

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }

    await prisma.notes.update({
      where: { id: noteId },
      data: { approved: true },
    });

    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function deleteNote(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const noteId = parseInt(formData.get("noteId") as string);

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }

    const note = await prisma.notes.findUnique({
      where: { id: noteId },
    });

    if (note?.companyLogoUrl) {
      await del(note.companyLogoUrl);
    }

    await prisma.notes.delete({
      where: { id: noteId },
    });

    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }

  redirect("/admin");
}
