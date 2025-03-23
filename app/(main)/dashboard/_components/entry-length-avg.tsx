import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
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

// Function to generate a random hex color
const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const EntryLengthAverages = ({ entries }: Props) => {
  // Helper function to count words in a text
  const countWords = (text: string) => (text ? text.split(/\s+/).length : 0);

  // Aggregate word count by category
  const categoryData = entries.reduce((acc, entry) => {
    const { collection, content } = entry;
    const wordCount = countWords(content);
    const colletionName = collection?.name || "unorganized";

    if (!acc[colletionName]) {
      acc[colletionName] = {
        category: colletionName,
        totalWords: 0,
        count: 0,
        color: getRandomColor(),
      };
    }

    acc[colletionName].totalWords += wordCount;
    acc[colletionName].count += 1;

    return acc;
  }, {} as Record<string, { category: string; totalWords: number; count: number; color: string }>);

  // Compute averages and convert to array
  const data = Object.values(categoryData).map(
    ({ category, totalWords, count, color }) => ({
      category,
      avgWordCount: Math.round(totalWords / count), // Average words per entry
      color,
    })
  );

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="avgWordCount">
          {data.map(({ category, color }) => (
            <Cell key={category} fill={color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EntryLengthAverages;
