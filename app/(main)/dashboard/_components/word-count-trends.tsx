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

const WordCountTrends = ({ entries }) => {
  // Helper function to count words in a text
  const countWords = (text) => (text ? text.split(/\s+/).length : 0);

  // Aggregate word count per date
  const wordCountData = entries.reduce((acc, entry) => {
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
    (a, b) => new Date(a.date) - new Date(b.date)
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
