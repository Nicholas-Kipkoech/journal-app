// "use server";

import { PrivateAxiosUtility } from "./api";

export async function getCollections() {
  const res = await PrivateAxiosUtility.get("/collections");
  return res.data;
}

export async function createCollection(name: string, description: string) {
  const res = await PrivateAxiosUtility.post("/collections", {
    name,
    description,
  });
  return res.data;
}

export async function deleteCollection(collectionId: string) {
  const res = await PrivateAxiosUtility.delete(
    `/collections?collectionId=${collectionId}`
  );
  return res.data;
}
