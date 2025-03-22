/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import Collections from "./_components/collections";
import { getCollections } from "@/app/services/collections";
import useFetch from "@/app/hooks/use-fetch";
import { getJournalEntries } from "@/app/services/journal";

const JournalEntries = () => {
  // fetch collections
  const { data: collections, fn: fetchColletions } = useFetch(getCollections);

  const {
    data: journalEntries,
    loading,
    error,
    fn: fetchJournalEntries,
  } = useFetch(getJournalEntries);

  useEffect(() => {
    fetchColletions();
    fetchJournalEntries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!journalEntries) return <p>No journal entries found.</p>;

  // Group entries by collection
  const entriesByCollection = journalEntries?.reduce(
    (acc: Record<string, any[]>, entry: any) => {
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
