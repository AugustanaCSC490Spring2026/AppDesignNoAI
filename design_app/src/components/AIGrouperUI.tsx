import React, { useState, DragEvent } from 'react';

interface AIGrouperUIProps {
  wordList: string[];
  categoryTitles: string[];
  onFinishedCallback: (results: string[][]) => void;
}

/**
 * AIGrouperUI: A functional, aesthetic interface for categorizing strings.
 * Follows UI principles: Visibility of system status, User control, and Aesthetic design.
 */
const AIGrouperUI: React.FC<AIGrouperUIProps> = ({ 
  wordList, 
  categoryTitles, 
  onFinishedCallback 
}) => {
  // State to track which words are in which category index
  // Index -1 represents the "unassigned" pool
  const [groups, setGroups] = useState<Record<number, string[]>>({
    [-1]: [...wordList],
    ...Object.fromEntries(categoryTitles.map((_, i) => [i, []]))
  });

  const [draggedWord, setDraggedWord] = useState<{ word: string; fromIndex: number } | null>(null);

  // --- Handlers ---

  const onDragStart = (word: string, fromIndex: number) => {
    setDraggedWord({ word, fromIndex });
  };

  const onDrop = (toIndex: number) => {
    if (!draggedWord) return;

    const { word, fromIndex } = draggedWord;
    if (fromIndex === toIndex) return;

    setGroups(prev => {
      const newGroups = { ...prev };
      // Remove from old
      newGroups[fromIndex] = newGroups[fromIndex].filter(w => w !== word);
      // Add to new
      newGroups[toIndex] = [...newGroups[toIndex], word];
      return newGroups;
    });
    setDraggedWord(null);
  };

  const handleFinish = () => {
    // Map the titles back to the nested array format for the callback
    const results = categoryTitles.map((_, i) => groups[i]);
    onFinishedCallback(results);
  };

  const isComplete = groups[-1].length === 0;

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-8 font-sans text-slate-800 bg-gray-50 rounded-2xl shadow-sm">
      <header className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-light tracking-tight text-slate-900">Word Grouper</h1>
        <p className="text-sm text-slate-500">Drag items into their respective columns.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Unassigned Pool */}
        <section 
          className="lg:col-span-1 bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 min-h-[400px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(-1)}
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Pending</h2>
          <div className="flex flex-wrap gap-2">
            {groups[-1].map((word) => (
              <WordCard key={word} word={word} onDragStart={() => onDragStart(word, -1)} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {categoryTitles.map((title, idx) => (
            <div 
              key={title}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(idx)}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col transition-colors duration-200 hover:border-blue-200"
            >
              <h3 className="text-sm font-semibold text-blue-600 mb-3">{title}</h3>
              <div className="flex-1 space-y-2">
                {groups[idx].map((word) => (
                  <WordCard key={word} word={word} onDragStart={() => onDragStart(word, idx)} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <footer className="mt-10 flex justify-end">
        <button
          onClick={handleFinish}
          disabled={!isComplete}
          className={`px-8 py-3 rounded-full font-medium transition-all ${
            isComplete 
            ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md" 
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Complete Grouping
        </button>
      </footer>
    </div>
  );
};

// Sub-component for individual word items to maintain DRY principles
const WordCard = ({ word, onDragStart }: { word: string; onDragStart: () => void }) => (
  <div
    draggable
    onDragStart={onDragStart}
    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm cursor-grab active:cursor-grabbing hover:bg-white hover:shadow-sm transition-all"
  >
    {word}
  </div>
);

export default AIGrouperUI;