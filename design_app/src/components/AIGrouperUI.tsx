import React, { useState, useEffect, useCallback } from 'react';

export interface AIGrouperUIProps {
  wordList: string[];
  categoryTitles: string[];
  onFinishedCallback: (results: string[][]) => void;
}

export const AIGrouperUI: React.FC<AIGrouperUIProps> = ({
  wordList,
  categoryTitles,
  onFinishedCallback,
}) => {
  // State Management
  const [queue, setQueue] = useState<string[]>(wordList);
  const [groups, setGroups] = useState<string[][]>(categoryTitles.map(() => []));
  const [history, setHistory] = useState<{ word: string; fromGroup: number }[]>([]);

  // Computed Values
  const totalWords = wordList.length;
  const categorizedCount = totalWords - queue.length;
  const progressPercentage = totalWords === 0 ? 100 : (categorizedCount / totalWords) * 100;
  const isFinished = queue.length === 0;

  // Actions
  const assignWord = useCallback(
    (groupIndex: number) => {
      if (queue.length === 0) return;

      const word = queue[0];
      setQueue((prev) => prev.slice(1));

      setGroups((prev) => {
        const newGroups = [...prev];
        newGroups[groupIndex] = [...newGroups[groupIndex], word];
        return newGroups;
      });

      setHistory((prev) => [...prev, { word, fromGroup: groupIndex }]);
    },
    [queue]
  );

  const undoLastAction = useCallback(() => {
    if (history.length === 0) return;

    const lastAction = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));

    setGroups((prev) => {
      const newGroups = [...prev];
      newGroups[lastAction.fromGroup] = newGroups[lastAction.fromGroup].filter(
        (w) => w !== lastAction.word
      );
      return newGroups;
    });

    setQueue((prev) => [lastAction.word, ...prev]);
  }, [history]);

  const removeWordFromGroup = (word: string, groupIndex: number) => {
    setGroups((prev) => {
      const newGroups = [...prev];
      newGroups[groupIndex] = newGroups[groupIndex].filter((w) => w !== word);
      return newGroups;
    });
    setQueue((prev) => [word, ...prev]);
    // Clear it from history to maintain sequential integrity
    setHistory((prev) => prev.filter((h) => h.word !== word));
  };

  const handleFinish = () => {
    if (isFinished) {
      onFinishedCallback(groups);
    }
  };

  // Keyboard Event Listener for maximum efficiency
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in some hypothetical input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Number keys for categories (1-9)
      const keyInt = parseInt(e.key, 10);
      if (!isNaN(keyInt) && keyInt > 0 && keyInt <= categoryTitles.length) {
        assignWord(keyInt - 1);
      }

      // Undo shortcut (Ctrl+Z or Cmd+Z)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        undoLastAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [assignWord, undoLastAction, categoryTitles.length]);

  return (
    <div style={styles.container}>
      {/* Header & Progress */}
      <div style={styles.header}>
        <div style={styles.headerText}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>Categorize Words</h2>
          <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>
            {categorizedCount} of {totalWords} completed
          </span>
        </div>
        <button
          onClick={undoLastAction}
          disabled={history.length === 0}
          style={{ ...styles.undoButton, opacity: history.length === 0 ? 0.5 : 1 }}
          title="Shortcut: Ctrl+Z"
        >
          ↶ Undo Last
        </button>
      </div>

      <div style={styles.progressBarBg}>
        <div style={{ ...styles.progressBarFill, width: `${progressPercentage}%` }} />
      </div>

      {/* Active Work Area */}
      <div style={styles.workspace}>
        {/* Current Word Display */}
        <div style={styles.wordDisplayContainer}>
          {isFinished ? (
            <div style={styles.finishedCard}>
              <h3 style={{ fontSize: '1.8rem', color: '#059669', margin: '0 0 10px 0' }}>All Done!</h3>
              <p style={{ color: '#4B5563', margin: 0 }}>Review your categories below, then submit.</p>
            </div>
          ) : (
            <div style={styles.wordCard}>
              <span style={{ color: '#9CA3AF', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Current Word
              </span>
              <h1 style={{ fontSize: '3rem', margin: '10px 0', color: '#1F2937' }}>{queue[0]}</h1>
              <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: 0 }}>
                Next up: {queue.length > 1 ? queue[1] : 'None'}
              </p>
            </div>
          )}
        </div>

        {/* Category Buttons */}
        <div style={styles.controlsContainer}>
          <p style={{ color: '#4B5563', margin: '0 0 10px 0', fontWeight: 500 }}>Assign to category:</p>
          <div style={styles.buttonList}>
            {categoryTitles.map((title, index) => (
              <button
                key={title}
                onClick={() => assignWord(index)}
                disabled={isFinished}
                style={{
                  ...styles.categoryButton,
                  opacity: isFinished ? 0.5 : 1,
                  cursor: isFinished ? 'not-allowed' : 'pointer',
                }}
              >
                <span style={styles.shortcutKey}>{index + 1}</span>
                {title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Review Section (Buckets) */}
      <div style={styles.bucketsContainer}>
        {categoryTitles.map((title, index) => (
          <div key={title} style={styles.bucket}>
            <div style={styles.bucketHeader}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#374151' }}>{title}</h4>
              <span style={styles.bucketCount}>{groups[index].length}</span>
            </div>
            <div style={styles.bucketItems}>
              {groups[index].length === 0 && (
                <span style={{ color: '#9CA3AF', fontSize: '0.85rem', fontStyle: 'italic' }}>Empty</span>
              )}
              {groups[index].map((word) => (
                <span
                  key={word}
                  onClick={() => removeWordFromGroup(word, index)}
                  style={styles.pill}
                  title="Click to remove"
                >
                  {word} <span style={{ marginLeft: '6px', color: '#9CA3AF' }}>×</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Submit */}
      <div style={styles.footer}>
        <button
          onClick={handleFinish}
          disabled={!isFinished}
          style={{
            ...styles.submitButton,
            backgroundColor: isFinished ? '#059669' : '#D1D5DB',
            cursor: isFinished ? 'pointer' : 'not-allowed',
          }}
        >
          Finish & Submit Categorization
        </button>
      </div>
    </div>
  );
};

// --- CSS-in-JS Styles ---
// Using strict typing for inline styles to ensure clean TypeScript compilation.
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column',
  },
  undoButton: {
    backgroundColor: '#F3F4F6',
    border: '1px solid #D1D5DB',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#374151',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  progressBarBg: {
    width: '100%',
    height: '8px',
    backgroundColor: '#E5E7EB',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '32px',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    transition: 'width 0.3s ease-in-out',
  },
  workspace: {
    display: 'flex',
    gap: '24px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  wordDisplayContainer: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
  },
  wordCard: {
    backgroundColor: '#F9FAFB',
    border: '2px dashed #D1D5DB',
    borderRadius: '12px',
    padding: '40px 20px',
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishedCard: {
    backgroundColor: '#ECFDF5',
    border: '2px solid #34D399',
    borderRadius: '12px',
    padding: '40px 20px',
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  categoryButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: '#ffffff',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    fontSize: '1.1rem',
    color: '#1F2937',
    textAlign: 'left',
    transition: 'all 0.15s',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  shortcutKey: {
    display: 'inline-block',
    backgroundColor: '#F3F4F6',
    color: '#4B5563',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    marginRight: '12px',
  },
  bucketsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
    borderTop: '1px solid #E5E7EB',
    paddingTop: '32px',
  },
  bucket: {
    backgroundColor: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '16px',
    minHeight: '120px',
  },
  bucketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid #E5E7EB',
  },
  bucketCount: {
    backgroundColor: '#E5E7EB',
    color: '#374151',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '0.8rem',
    fontWeight: 600,
  },
  bucketItems: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  pill: {
    backgroundColor: '#ffffff',
    border: '1px solid #D1D5DB',
    borderRadius: '9999px',
    padding: '4px 12px',
    fontSize: '0.9rem',
    color: '#374151',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.15s',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid #E5E7EB',
    paddingTop: '24px',
  },
  submitButton: {
    color: '#ffffff',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 600,
    transition: 'background-color 0.2s',
  },
};

export default AIGrouperUI;