"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCollections } from "@/app/services/collections";
import { getJournalEntries } from "@/app/services/journal";
import DeleteCollectionDialog from "./_components/delete-collection";
import { JournalFilters } from "./_components/journal-filter";

export default function CollectionPage() {
  const { collectionId } = useParams();
  const [entries, setEntries] = useState(null);
  const [collections, setCollections] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const fetchedEntries = await getJournalEntries(collectionId);
        console.log("fetchedentries", fetchedEntries, "params", collectionId);
        setEntries(fetchedEntries);

        if (collectionId !== "unorganized") {
          const fetchedCollections = await getCollections();
          setCollections(fetchedCollections.collections);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [collectionId]);

  const collection = collections?.find((c) => c.id === collectionId);

  if (loading) return <p>Loading...</p>;

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
