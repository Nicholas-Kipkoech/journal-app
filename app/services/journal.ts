import { PrivateAxiosUtility } from "./api";

export async function getJournalEntries(collectionId: string) {
  const url = collectionId
    ? `/journals/?collectionId=${collectionId}`
    : "/journals";
  const res = await PrivateAxiosUtility.get(url);
  return res.data;
}
export async function getJournalEntry(id: string) {
  const res = await PrivateAxiosUtility.get(`/journals/${id}`);
  return res.data;
}

interface Journal {
  id?: string;
  title: string;
  content: string;
  collectionId?: string;
}

export const createJournalEntry = async (journal: Journal) => {
  const res = await PrivateAxiosUtility.post("/journals", journal);
  return res.data;
};

export async function updateJournalEntry(journal: Journal) {
  const res = await PrivateAxiosUtility.patch(
    `/journals/${journal.id}`,
    journal
  );
  return res.data;
}

export async function deleteJournalEntry(journalId: string) {
  const res = await PrivateAxiosUtility.delete(`/journals/${journalId}`);
  return res.data;
}
