import NotePage from "@/components/NotePage";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { slug: string };
}

const getNote = cache(async (slug: string) => {
  const note = await prisma.notes.findUnique({
    where: { slug },
  });

  if (!note) notFound();

  return note;
});

export async function generateStaticParams() {
  const notes = await prisma.notes.findMany({
    where: { approved: true },
    select: { slug: true },
  });

  return notes.map(({ slug }) => slug);
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const note = await getNote(slug);

  return {
    title: note.title,
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const note = await getNote(slug);

  const { applicationEmail, applicationUrl } = note;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Note has no application link or email");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <NotePage note={note} />
      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
}
