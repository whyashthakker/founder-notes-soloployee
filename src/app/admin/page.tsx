import NoteListCard from "@/components/NoteListCard";
import NoteListItem from "@/components/NoteListItem";
import H1 from "@/components/ui/h1";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const unapprovedNotes = await prisma.notes.findMany({
    where: { approved: false },
  });

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <H1 className="text-center">Admin Dashboard</H1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved notes:</h2>
        {unapprovedNotes.map((note) => (
          <Link key={note.id} href={`/admin/notes/${note.slug}`} className="block">
            <NoteListCard note={note} />
          </Link>
        ))}
        {unapprovedNotes.length === 0 && (
          <p className="text-muted-foreground">No unapproved notes</p>
        )}
      </section>
    </main>
  );
}
