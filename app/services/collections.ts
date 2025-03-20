// "use server";

import axios from "axios";

export async function getCollections({
  collectionId,
}: { collectionId?: string } = {}) {
  if (typeof window === "undefined") return null; // Ensure it's client-side

  const token = localStorage.getItem("access_token");
  if (!token) {
    console.warn("No access token found.");
    return null;
  }

  try {
    const res = await axios.get("http://localhost:8080/collections", {
      headers: { Authorization: `Bearer ${token}` },
      params: collectionId ? { collectionId } : {},
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    throw error;
  }
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
