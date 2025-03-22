"use client";

import { useEffect } from "react";
import Collections from "./_components/collections";
import { getCollections } from "@/app/services/collections";
import { useJournals } from "@/app/context/JournalContext";
import useFetch from "@/app/hooks/use-fetch";

const JournalEntries = () => {
  const { journalEntries } = useJournals();

  // fetch collections
  const {
    data: collections,
    loading,
    error,
    fn: fetchColletions,
  } = useFetch(getCollections);

  useEffect(() => {
    fetchColletions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!journalEntries) return <p>No journal entries found.</p>;

  // Group entries by collection
  const entriesByCollection = journalEntries?.reduce(
    (acc: Record<string, unknown[]>, entry: any) => {
      const collectionId = entry?.collectionId || "unorganized";
      if (!acc[collectionId]) {
        acc[collectionId] = [];
      }
      acc[collectionId].push(entry);
      return acc;
    },
    {}
  );

  return (
    <Collections
      collections={collections}
      entriesByCollection={entriesByCollection}
    />
  );
};

export default JournalEntries;
