import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface JournalEntry {
  id: string;
  content: string;
  createdAt: string;
}

interface WordCountTrendsProps {
  entries: JournalEntry[];
}

const WordCountTrends: React.FC<WordCountTrendsProps> = ({ entries }) => {
  // Helper function to count words in a text
  const countWords = (text: string) =>
    text ? text.trim().split(/\s+/).length : 0;

  // Aggregate word count per date
  const wordCountData = entries.reduce<
    Record<string, { date: string; wordCount: number }>
  >((acc, entry) => {
    const date = entry.createdAt.split("T")[0]; // Extract date (YYYY-MM-DD)
    const wordCount = countWords(entry.content);

    if (!acc[date]) {
      acc[date] = { date, wordCount };
    } else {
      acc[date].wordCount += wordCount;
    }

    return acc;
  }, {});

  // Convert object to array for Recharts
  const data = Object.values(wordCountData).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="wordCount" stroke="#0088FE" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WordCountTrends;
