import { createContext, useContext, useEffect, useState } from "react";
import { getJournalEntries } from "../services/journal";

const JournalContext = createContext<{
  journalEntries: any[];
  loading: boolean;
  refreshJournals: () => void;
} | null>(null);

export const JournalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getJournals = async () => {
    try {
      setLoading(true);
      const data = await getJournalEntries();
      setJournalEntries(data);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJournals();
  }, []);

  return (
    <JournalContext.Provider
      value={{ journalEntries, loading, refreshJournals: getJournals }}
    >
      {children}
    </JournalContext.Provider>
  );
};

// Custom hook to use the Journal Context
export const useJournals = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournals must be used within a JournalProvider");
  }
  return context;
};
