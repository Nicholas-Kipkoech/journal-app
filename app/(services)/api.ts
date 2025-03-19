export const loginUser = async (email: string, password: string) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json();
};

interface Journal {
  title: string;
  content: string;
  collectionId: string;
  userId: string;
  moodQuery: string;
  mood: string;
}

export const createJournal = async (journal: Journal) => {
  const response = await fetch("/api/journal/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(journal),
  });
  if (!response.ok) {
    throw new Error("Failed to create journal");
  }
  return response.json();
};
