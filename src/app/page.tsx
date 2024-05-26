import NoteFilterSidebar from "@/components/NoteFilterSidebar";
import NoteResults from "@/components/NoteResultsGrid";
import H1 from "@/components/ui/h1";
import { NoteFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

function getTitle({ q, type, location, remote }: NoteFilterValues) {
  const titlePrefix = q
    ? `${q} notes`
    : type
      ? `${type} notes`
      : remote
        ? "Author Specific Notes"
        : "We failed, so you don't.";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Founders Bros`,
  };
}

export default async function Home({
  searchParams: { q, type, location, remote, page },
}: PageProps) {
  const filterValues: NoteFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        {/* <p className="text-muted-foreground">Open & public sourced.</p> */}
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        {/* <NoteFilterSidebar defaultValues={filterValues} /> */}
        <NoteResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
