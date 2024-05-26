import { Metadata } from "next";
import NewNoteForm from "./NewNoteForm";

export const metadata: Metadata = {
  title: "Post a new note",
};

export default function Page() {
  return <NewNoteForm />;
}
