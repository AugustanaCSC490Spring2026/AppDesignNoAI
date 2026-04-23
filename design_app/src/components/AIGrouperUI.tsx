import React, { useState, useMemo } from "react";


// This code was written entirely by an AI (ChatGPT) based on the prompt "Create a React component for grouping words by length. 
// The UI should allow users to quickly add words, see them grouped, and edit/delete them. 
// Focus on speed and ease of use, with keyboard support for adding and navigating words."
type Groups = {
  [length: number]: string[];
};

const AIGrouperUI: React.FC = () => {
  const [input, setInput] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [editingWord, setEditingWord] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // 🔹 Group words by length (core logic)
  const groupedWords: Groups = useMemo(() => {
    const groups: Groups = {};
    words.forEach((word) => {
      const len = word.length;
      if (!groups[len]) groups[len] = [];
      groups[len].push(word);
    });
    return groups;
  }, [words]);

  // 🔹 Add words quickly (comma or space separated)
  const handleAddWords = () => {
    const newWords = input
      .split(/[\s,]+/)
      .map((w) => w.trim())
      .filter(Boolean);

    setWords((prev) => [...prev, ...newWords]);
    setInput("");
  };

  // 🔹 Delete word
  const handleDelete = (word: string) => {
    setWords((prev) => prev.filter((w) => w !== word));
  };

  // 🔹 Start editing
  const handleEditStart = (word: string) => {
    setEditingWord(word);
    setEditValue(word);
  };

  // 🔹 Save edit
  const handleEditSave = () => {
    if (!editingWord) return;

    setWords((prev) =>
      prev.map((w) => (w === editingWord ? editValue : w))
    );

    setEditingWord(null);
    setEditValue("");
  };

  // 🔹 Cancel edit
  const handleEditCancel = () => {
    setEditingWord(null);
    setEditValue("");
  };

  // 🔹 Keyboard support (speed)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddWords();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Word Grouper</h1>

      {/* Input Section */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter words (comma or space separated)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <button onClick={handleAddWords} style={styles.primaryButton}>
          Add
        </button>
      </div>

      {/* Feedback */}
      <p style={styles.helperText}>
        Words are automatically grouped by length. Click a word to edit or delete.
      </p>

      {/* Groups */}
      <div style={styles.groupsContainer}>
        {Object.keys(groupedWords)
          .sort((a, b) => Number(a) - Number(b))
          .map((length) => (
            <div key={length} style={styles.group}>
              <h3 style={styles.groupTitle}>{length} Letters</h3>

              <div style={styles.wordList}>
                {groupedWords[Number(length)].map((word) => (
                  <div key={word} style={styles.wordCard}>
                    {editingWord === word ? (
                      <>
                        <input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          style={styles.editInput}
                        />
                        <button
                          onClick={handleEditSave}
                          style={styles.saveButton}
                        >
                          ✓
                        </button>
                        <button
                          onClick={handleEditCancel}
                          style={styles.cancelButton}
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.wordText}>{word}</span>
                        <div style={styles.actions}>
                          <button
                            onClick={() => handleEditStart(word)}
                            style={styles.editButton}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(word)}
                            style={styles.deleteButton}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {words.length === 0 && (
        <p style={styles.emptyState}>
          No words yet. Add some above to get started.
        </p>
      )}
    </div>
  );
};

export default AIGrouperUI;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },
  primaryButton: {
    padding: "10px 16px",
    cursor: "pointer",
  },
  helperText: {
    fontSize: "14px",
    color: "#666",
  },
  groupsContainer: {
    marginTop: "20px",
  },
  group: {
    marginBottom: "20px",
  },
  groupTitle: {
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
  },
  wordList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  },
  wordCard: {
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  wordText: {
    fontWeight: 500,
  },
  actions: {
    display: "flex",
    gap: "5px",
  },
  editButton: {
    cursor: "pointer",
  },
  deleteButton: {
    cursor: "pointer",
    color: "red",
  },
  editInput: {
    padding: "4px",
  },
  saveButton: {
    cursor: "pointer",
    color: "green",
  },
  cancelButton: {
    cursor: "pointer",
    color: "gray",
  },
  emptyState: {
    textAlign: "center",
    marginTop: "20px",
    color: "#999",
  },
};