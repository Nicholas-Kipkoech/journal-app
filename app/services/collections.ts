// "use server";

import { PrivateAxiosUtility } from "./api";

export async function getCollections({
  collectionId,
}: { collectionId?: string } = {}) {
  const res = await PrivateAxiosUtility.get("/collections");
  return res.data;
}

export async function createCollection(name: string, description: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/collection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Failed to creating collection: ${response.statusText}`);
    }
    return { success: true, data: response.json() };
  } catch (error) {
    console.error("error", error);
    return [];
  }
}
