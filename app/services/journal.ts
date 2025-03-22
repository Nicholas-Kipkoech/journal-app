import { PrivateAxiosUtility } from "./api";

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  moodImageUrl?: string;
  collectionId: string;
  collection?: {
    id: string;
    name: string;
  };
}

export async function getJournalEntries(
  collectionId: string
): Promise<JournalEntry[]> {
  const url = collectionId
    ? `/journals/?collectionId=${collectionId}`
    : "/journals";
  const res = await PrivateAxiosUtility.get(url);
  return res.data as Promise<JournalEntry[]>;
}
export async function getJournalEntry(id: string): Promise<JournalEntry> {
  const res = await PrivateAxiosUtility.get(`/journals/${id}`);
  return res.data as Promise<JournalEntry>;
}

interface Journal {
  id?: string;
  title: string;
  content: string;
  collectionId?: string;
}

export const createJournalEntry = async (
  journal: Journal
): Promise<JournalEntry> => {
  const res = await PrivateAxiosUtility.post("/journals", journal);
  return res.data as Promise<JournalEntry>;
};

export async function updateJournalEntry(
  journal: Journal
): Promise<JournalEntry> {
  const res = await PrivateAxiosUtility.patch(
    `/journals/${journal.id}`,
    journal
  );
  return res.data as Promise<JournalEntry>;
}

export async function deleteJournalEntry(
  journalId: string
): Promise<JournalEntry> {
  const res = await PrivateAxiosUtility.delete(`/journals/${journalId}`);
  return res.data as Promise<JournalEntry>;
}
