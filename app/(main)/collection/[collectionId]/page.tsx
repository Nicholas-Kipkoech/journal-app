"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { getCollections } from "@/app/services/collections";
import { getJournalEntries } from "@/app/services/journal";
import DeleteCollectionDialog from "./_components/delete-collection";
import { JournalFilters } from "./_components/journal-filter";
import useFetch from "@/app/hooks/use-fetch";

export default function CollectionPage() {
  const { collectionId } = useParams();

  const {
    data: entries,
    loading: entriesLoading,
    fn: fetchEntries,
  } = useFetch(getJournalEntries);
  const {
    data: collections,
    loading: collectionsLoading,
    fn: fetchCollections,
  } = useFetch(getCollections);

  useEffect(() => {
    if (collectionId) {
      fetchEntries(collectionId); // Fetch journal entries for the collection

      if (collectionId !== "unorganized") {
        fetchCollections(); // Fetch collections only if not "unorganized"
      }
    }
  }, [collectionId]);

  const collection = collections?.find((c) => c.id === collectionId);

  if (entriesLoading || collectionsLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold gradient-title">
            {collectionId === "unorganized"
              ? "Unorganized Entries"
              : collection?.name || "Collection"}
          </h1>
          {collection && entries && (
            <DeleteCollectionDialog
              collection={collection}
              entriesCount={entries?.length}
            />
          )}
        </div>
        {collection?.description && (
          <h2 className="font-extralight pl-1">{collection.description}</h2>
        )}
      </div>
      <JournalFilters entries={entries} />
    </div>
  );
}
