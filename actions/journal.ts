"use server";

export async function getJournalEntries(userId: string, collectionId?: string) {
  try {
    const response = await fetch(`/api/journal/fetch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, collectionId }),
      cache: "no-store", // Prevent caching stale data
    });

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
