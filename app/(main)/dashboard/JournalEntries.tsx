"use client";

import { useEffect, useState } from "react";
import { getJournalEntries } from "@/app/services/journal";
import Collections from "./_components/collections";
import { getCollections } from "@/app/services/collections";

const JournalEntries = () => {
  const [entriesData, setEntriesData] = useState<any>(null);
  const [collections, setCollections] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getJournalEntries();
        setEntriesData(data);
      } catch (err) {
        setError("Failed to fetch journal entries.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();
        setCollections(data.collections);
      } catch (err) {
        setError("Failed to fetch collections entries.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!entriesData) return <p>No journal entries found.</p>;

  // Group entries by collection
  const entriesByCollection = entriesData.journalEntries.reduce(
    (acc: Record<string, any[]>, entry: any) => {
      const collectionId = entry.collectionId || "unorganized";
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
