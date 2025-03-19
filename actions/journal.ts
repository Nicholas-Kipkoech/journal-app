"use server";

export async function getJournalEntries({
  collectionId,
}: { collectionId?: string } = {}) {
  try {
    const query = collectionId ? `?collectionId=${collectionId}` : "";
    const response = await fetch(
      `http://localhost:3000/api/journal/fetch${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Prevent caching stale data
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch journals: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.entries;
  } catch (error) {
    console.error("Error fetching journals:", error);
    return [];
  }
}

interface Journal {
  title: string;
  content: string;
  collectionId: string;
  moodQuery: string;
  mood: string;
}

export const createJournalEntry = async (journal: Journal) => {
  const response = await fetch("http://localhost:3000/api/journal/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(journal),
  });
  if (!response.ok) {
    throw new Error("Failed to create journal");
  }
  return response.json();
};

export async function getJournalEntry(id: string) {
  const response = await fetch(`/api/journal/create?journalId=${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to create journal");
  }
  return response.json();
}

export async function updateJournalEntry() {}
