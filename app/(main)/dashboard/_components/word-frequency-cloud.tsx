import React from "react";

const WordFrequencyCloud = ({ entries = [] }) => {
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

  // Extract word frequencies
  const getWordFrequency = (entries) => {
    if (!Array.isArray(entries) || entries.length === 0) return [];

    const wordMap = {};
    entries.forEach((entry) => {
      if (!entry || !entry.content) return;

      const words = entry.content.toLowerCase().match(/\b\w+\b/g) || [];
      words.forEach((word) => {
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
  words.sort((a, b) => b.count - a.count);

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
      {words.map((item, index) => {
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
