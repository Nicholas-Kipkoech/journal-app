import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAnalytics(period = "30d"): Promise<any> {
  if (typeof window === "undefined") return null; // Ensure it's client-side

  const token = localStorage.getItem("access_token");
  if (!token) {
    console.warn("No access token found.");
    return null;
  }

  try {
    const res = await axios.post(
      "http://localhost:8080/analytics",
      { period },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("res...", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    throw error;
  }
}
