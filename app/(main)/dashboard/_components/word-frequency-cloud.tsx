/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface Entry {
  id: string;
  title: string;
  content: string;
}
interface WordCloudProps {
  entries: Entry[];
}

const WordFrequencyCloud: React.FC<WordCloudProps> = ({ entries }) => {
  // Stopwords to ignore
  const stopwords = new Set([
    "the",
    "is",
    "and",
    "to",
    "of",
    "in",
    "a",
    "this",
    "my",
    "been",
    "i",
    "for",
  ]);

  // Function to remove HTML tags from a string
  const stripHTML = (text: string) => text.replace(/<\/?[^>]+(>|$)/g, "");

  // Extract word frequencies
  const getWordFrequency = (entries: Entry[]) => {
    if (!Array.isArray(entries) || entries.length === 0) return [];

    const wordMap: any = {};
    entries.forEach((entry) => {
      if (!entry || !entry.content) return;

      // Strip HTML before extracting words
      const cleanText = stripHTML(entry.content);
      const words = cleanText.toLowerCase().match(/\b\w+\b/g) || [];

      words.forEach((word: string) => {
        if (!stopwords.has(word)) {
          wordMap[word] = (wordMap[word] || 0) + 1;
        }
      });
    });

    return Object.entries(wordMap).map(([word, count]) => ({ word, count }));
  };

  const words = getWordFrequency(entries);

  if (words.length === 0) {
    return <p style={{ textAlign: "center" }}>No words available</p>;
  }

  // Sort by frequency
  words.sort((a: any, b: any) => b.count - a.count);

  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        position: "relative",
        textAlign: "center",
        padding: 2,
      }}
    >
      {words.map((item: any, index) => {
        const fontSize = 12 + item.count * 5; // Scale font size by frequency
        const x = Math.random() * 80 + 10; // Random X position
        const y = Math.random() * 80 + 10; // Random Y position
        const rotate = Math.random() > 0.5 ? 0 : 90; // Random rotation

        return (
          <span
            key={index}
            style={{
              position: "absolute",
              fontSize: `${fontSize}px`,
              fontWeight: "bold",
              color: `hsl(${Math.random() * 360}, 70%, 50%)`,
              left: `${x}%`,
              top: `${y}%`,
              transform: `rotate(${rotate}deg)`,
              whiteSpace: "nowrap",
            }}
          >
            {item.word}
          </span>
        );
      })}
    </div>
  );
};

export default WordFrequencyCloud;
