// "use server";

import { PrivateAxiosUtility } from "./api";

interface Collection {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export async function getCollections(): Promise<Collection[]> {
  const res = await PrivateAxiosUtility.get("/collections");
  return res.data as Promise<Collection[]>;
}

export async function createCollection(
  name: string,
  description: string
): Promise<Collection> {
  const res = await PrivateAxiosUtility.post("/collections", {
    name,
    description,
  });
  return res.data as Promise<Collection>;
}

export async function deleteCollection(collectionId: string) {
  const res = await PrivateAxiosUtility.delete(
    `/collections?collectionId=${collectionId}`
  );
  return res.data;
}
