export async function getCollections() {
  try {
    const response = await fetch(`/api/collection/fetch`, {
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
