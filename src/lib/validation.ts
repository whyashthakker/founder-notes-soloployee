import { z } from "zod";
import { categories } from "@/lib/note-types";

export const createNoteSchema = z.object({
  title: z.string().min(1, "Required").max(100),
  writerName: z.string().min(1, "Required").max(100),
  socialMediaUrl: z.string().max(100).url().optional(),
  category: z.string().optional(),
  description: z.string().max(5000),
});

export type CreateNoteValues = z.infer<typeof createNoteSchema>;

export const noteFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});
export type NoteFilterValues = z.infer<typeof noteFilterSchema>;
