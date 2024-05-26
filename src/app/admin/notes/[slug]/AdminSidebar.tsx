"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { useFormState } from "react-dom";
import { approveSubmission, deleteNote } from "./actions";
import { Notes } from "@prisma/client";

interface AdminSidebarProps {
  note: Notes;
}

export default function AdminSidebar({ note }: AdminSidebarProps) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {note.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApproveSubmissionButton noteId={note.id} />
      )}
      <DeleteNoteButton noteId={note.id} />
    </aside>
  );
}

interface AdminButtonProps {
  noteId: number;
}

function ApproveSubmissionButton({ noteId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="noteId" value={noteId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

function DeleteNoteButton({ noteId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(deleteNote, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="noteId" value={noteId} />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}
