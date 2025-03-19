"use server";

export async function getCollections(userId: string) {
  try {
    const response = await fetch(`/api/collection?userId=${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },

      cache: "no-store", // Prevent caching stale data
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch journals: ${response.statusText}`);
    }
    const data = await response.json();
    return data.collections;
  } catch (error) {
    console.error("error", error);
    throw new Error("Error");
  }
}

interface Collection {
  name: string;
  description: string;
  userId: string;
}

export async function createCollection(collection: Collection) {
  try {
    const response = await fetch(`/api/collection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    });
    if (!response.ok) {
      throw new Error(`Failed to creating collection: ${response.statusText}`);
    }
    const data = await response.json();
    return data.collections;
  } catch (error) {
    console.error("error", error);
    throw new Error("Error");
  }
}
