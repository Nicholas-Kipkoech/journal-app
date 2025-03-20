import axios from "axios";

export async function getJournalEntries({
  collectionId,
}: { collectionId?: string } = {}) {
  if (typeof window === "undefined") return null; // Ensure it's client-side

  const token = localStorage.getItem("access_token");
  if (!token) {
    console.warn("No access token found.");
    return null;
  }

  try {
    const res = await axios.get("http://localhost:8080/journals", {
      headers: { Authorization: `Bearer ${token}` },
      params: collectionId ? { collectionId } : {},
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    throw error;
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
  if (typeof window === "undefined") return null; // Ensure it's client-side

  const token = localStorage.getItem("access_token");
  if (!token) {
    console.warn("No access token found.");
    return null;
  }

  try {
    const res = await axios.post("http://localhost:8080/journals", journal, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding journal:", error);
    throw error;
  }
};

export async function updateJournalEntry() {}

export async function getJournalEntry() {}

export async function deleteJournalEntry() {}
