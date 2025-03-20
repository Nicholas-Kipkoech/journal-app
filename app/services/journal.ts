import axios from "axios";
import { PrivateAxiosUtility } from "./api";

export async function getJournalEntries() {
  const res = await PrivateAxiosUtility.get("/journals");
  return res.data;
}
export async function getJournalEntry(id: string) {
  const res = await PrivateAxiosUtility.get(`/journals/${id}`);
  return res.data;
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

export async function deleteJournalEntry() {}
