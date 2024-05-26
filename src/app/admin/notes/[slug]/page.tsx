import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import NotePage from "@/components/NotePage";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const note = await prisma.notes.findUnique({
    where: { slug },
  });

  if (!note) notFound();

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <NotePage note={note} />
      <AdminSidebar note={note} />
    </main>
  );
}
