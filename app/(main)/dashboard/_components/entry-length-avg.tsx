import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Collection {
  name: string;
}

interface Entry {
  id: string;
  content: string;
  collection: Collection;
}

interface Props {
  entries: Entry[];
}

const EntryLengthAverages = ({ entries }: Props) => {
  // Helper function to count words in a text
  const countWords = (text: string) => (text ? text.split(/\s+/).length : 0);

  // Aggregate word count by category
  const categoryData = entries.reduce((acc, entry) => {
    const { collection, content } = entry;
    const wordCount = countWords(content);

    if (!acc[collection.name]) {
      acc[collection.name] = {
        category: collection.name,
        totalWords: 0,
        count: 0,
      };
    }

    acc[collection.name].totalWords += wordCount;
    acc[collection.name].count += 1;

    return acc;
  }, {} as Record<string, { category: string; totalWords: number; count: number }>);

  // Compute averages and convert to array
  const data = Object.values(categoryData).map(
    ({ category, totalWords, count }) => ({
      category,
      avgWordCount: Math.round(totalWords / count), // Average words per entry
    })
  );

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="avgWordCount" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EntryLengthAverages;
