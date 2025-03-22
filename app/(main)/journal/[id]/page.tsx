"use client"; // Force client-side execution

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import DeleteDialog from "./_components/delete-dialog";
import EditButton from "./_components/edit-button";
import { getJournalEntry } from "@/app/services/journal";
import { useParams } from "next/navigation";
import useFetch from "@/app/hooks/use-fetch";

export default function JournalEntryPage() {
  const { id } = useParams();

  const {
    data: entry,
    fn: fetchJournalEntry,
    loading,
  } = useFetch(getJournalEntry);

  useEffect(() => {
    fetchJournalEntry(id);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {entry?.moodImageUrl && (
        <div className="relative h-48 md:h-64 w-full">
          <Image
            src={entry?.moodImageUrl}
            alt="Mood visualization"
            className="object-contain"
            fill
            priority
          />
        </div>
      )}

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-5xl font-bold gradient-title">
                  {entry?.title}
                </h1>
              </div>
              <p className="text-gray-500">
                {/* Created {format(new Date(entry?.createdAt), "PPP")} */}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <EditButton entryId={id} />
              <DeleteDialog entryId={id} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {entry?.collection && (
              <Link href={`/collection/${entry?.collection.id}`}>
                <Badge>Collection: {entry?.collection.name}</Badge>
              </Link>
            )}
          </div>
        </div>

        <hr />

        <div className="ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: entry?.content }}
          />
        </div>

        <div className="text-sm text-gray-500 pt-4 border-t">
          {/* Last updated {format(new Date(entry.updatedAt), "PPP 'at' p")} */}
        </div>
      </div>
    </>
  );
}
