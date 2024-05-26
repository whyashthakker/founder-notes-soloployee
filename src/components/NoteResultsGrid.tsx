import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { NoteFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import NoteListItem from "./NoteListItem";
import NoteListCard from "./NoteListCard";

interface NoteResultsProps {
  filterValues: NoteFilterValues;
  page?: number;
}

export default async function NoteResults({
  filterValues,
  page = 1,
}: NoteResultsProps) {
  const { q, type, location, remote } = filterValues;
  const notesPerPage = 12; // Display 9 notes per page (3 rows of 3 notes)
  const skip = (page - 1) * notesPerPage;
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.NotesWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { writerName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.NotesWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const notesPromise = prisma.notes.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: notesPerPage,
    skip,
  });

  const countPromise = prisma.notes.count({ where });

  const [notes, totalResults] = await Promise.all([notesPromise, countPromise]);

  return (
    <div className="grow space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {notes.map((note) => (
          // <Link key={note.id} href={`/notes/${note.slug}`} className="block">
            <NoteListCard key={note.id} note={note} />
          // </Link>
        ))}
      </div>
      {notes.length === 0 && (
        <p className="m-auto text-center">No notes found.</p>
      )}
      {notes.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / notesPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: NoteFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, type, location, remote },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
