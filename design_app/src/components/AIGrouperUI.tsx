// This code was written entirely by AI (ChatGPT) based on the prompt "Create a React component for grouping words by length. 
// The UI should allow users to quickly add words, see them grouped, and edit/delete them. 
// Focus on speed and ease of use, with keyboard support for adding and navigating words."


import React, { useState, useEffect } from "react";

interface AIGrouperProps {
  wordList?: string[];
  categoryTitles?: string[];
  onFinishedCallback?: (results: string[][]) => void;
}

const AIGrouperUI: React.FC<AIGrouperProps> = ({ 
  wordList = [], 
  categoryTitles = ["Group 1", "Group 2", "Group 3"], 
  onFinishedCallback 
}) => {
  const [unassigned, setUnassigned] = useState<string[]>([]);
  const [groups, setGroups] = useState<{ [key: string]: string[] }>({});
  const [selectedCategory, setSelectedCategory] = useState(categoryTitles[0]);

  // Initialize words from props
  useEffect(() => {
    setUnassigned(wordList);
    const initialGroups: { [key: string]: string[] } = {};
    categoryTitles.forEach(title => {
      initialGroups[title] = [];
    });
    setGroups(initialGroups);
  }, [wordList, categoryTitles]);

  const handleMoveToGroup = (word: string) => {
    // Remove from unassigned
    setUnassigned((prev) => prev.filter((w) => w !== word));
    // Add to current selected group
    setGroups((prev) => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], word],
    }));
  };

  const handleRemoveFromGroup = (word: string, category: string) => {
    setGroups((prev) => ({
      ...prev,
      [category]: prev[category].filter((w) => w !== word),
    }));
    setUnassigned((prev) => [...prev, word]);
  };

  const handleSubmit = () => {
    if (onFinishedCallback) {
      // Convert object groups back to 2D array for the App's scorer
      const result = categoryTitles.map(title => groups[title]);
      onFinishedCallback(result);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Power Grouper</h1>
      
      {/* Category Selector */}
      <div style={styles.selectorContainer}>
        <span>Assigning to: </span>
        {categoryTitles.map(title => (
          <button 
            key={title} 
            onClick={() => setSelectedCategory(title)}
            style={{
              ...styles.tabButton, 
              backgroundColor: selectedCategory === title ? "#007bff" : "#eee",
              color: selectedCategory === title ? "white" : "black"
            }}
          >
            {title}
          </button>
        ))}
      </div>

      <div style={styles.mainGrid}>
        {/* Unassigned Pool */}
        <div style={styles.pool}>
          <h3>Unassigned Words</h3>
          <div style={styles.wordList}>
            {unassigned.map(word => (
              <button key={word} onClick={() => handleMoveToGroup(word)} style={styles.wordItem}>
                {word} +
              </button>
            ))}
          </div>
        </div>

        {/* Grouped Buckets */}
        <div style={styles.results}>
          {categoryTitles.map(title => (
            <div key={title} style={styles.groupBucket}>
              <strong>{title} ({groups[title]?.length || 0})</strong>
              <div style={styles.miniList}>
                {groups[title]?.map(word => (
                  <span key={word} onClick={() => handleRemoveFromGroup(word, title)} style={styles.wordBadge}>
                    {word} ✕
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} style={styles.submitButton}>
        Submit Groups & View Score
      </button>
    </div>
  );
};

export default AIGrouperUI;

const styles: { [key: string]: React.CSSProperties } = {
  container: { maxWidth: "900px", margin: "0 auto", padding: "20px", fontFamily: "system-ui, sans-serif" },
  title: { textAlign: "center", color: "#333" },
  selectorContainer: { display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px", padding: "10px", background: "#f9f9f9", borderRadius: "8px" },
  tabButton: { padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  mainGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  pool: { border: "2px dashed #ccc", padding: "15px", borderRadius: "8px", minHeight: "300px" },
  wordList: { display: "flex", flexWrap: "wrap", gap: "8px" },
  wordItem: { padding: "6px 12px", cursor: "pointer", background: "white", border: "1px solid #ddd", borderRadius: "4px" },
  results: { display: "flex", flexDirection: "column", gap: "15px" },
  groupBucket: { padding: "10px", border: "1px solid #eee", borderRadius: "6px", background: "#fff" },
  miniList: { display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" },
  wordBadge: { fontSize: "12px", padding: "2px 8px", background: "#e9ecef", borderRadius: "12px", cursor: "pointer" },
  submitButton: { width: "100%", marginTop: "30px", padding: "15px", fontSize: "18px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }
};