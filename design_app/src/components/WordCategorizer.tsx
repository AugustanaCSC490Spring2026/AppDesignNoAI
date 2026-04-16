import { useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { CheckCircle2, XCircle } from "lucide-react";

interface WordCategorizerProps {
  wordList: string[];
  categoryTitles: string[];
  onFinishedCallback: (groups: Record<string, string[]>) => void;
}

function WordCategorizer({
  wordList,
  categoryTitles,
  onFinishedCallback,
}: WordCategorizerProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string[]>>(
    () => {
      const initial: Record<string, string[]> = {};
      categoryTitles.forEach((cat) => {
        initial[cat] = [];
      });
      return initial;
    },
  );

  const assignedWords = new Set(Object.values(assignments).flat());
  const remainingWords = wordList.filter((word) => !assignedWords.has(word));
  const isComplete = remainingWords.length === 0;
  const progressPercent = Math.round(
    (assignedWords.size / wordList.length) * 100,
  );

  const assignWordToCategory = (category: string) => {
    if (!selectedWord) return;

    setAssignments((prev) => ({
      ...prev,
      [category]: [...prev[category], selectedWord],
    }));
    setSelectedWord(null);
  };

  const removeWordFromCategory = (category: string, word: string) => {
    setAssignments((prev) => ({
      ...prev,
      [category]: prev[category].filter((w) => w !== word),
    }));
  };

  const resetAll = () => {
    const fresh: Record<string, string[]> = {};
    categoryTitles.forEach((cat) => {
      fresh[cat] = [];
    });
    setAssignments(fresh);
    setSelectedWord(null);
  };

  const submitResults = () => {
    onFinishedCallback(assignments);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 space-y-6">
      {/* Header with Progress */}
      <div className="text-center space-y-4">
        <div>
          <h1>Word Categorization</h1>
          <p className="text-gray-600 mt-2">
            Select a word below, then choose which category it belongs to
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600">
              {assignedWords.size}
            </div>
            <div className="text-sm text-gray-500">
              / {wordList.length} sorted
            </div>
          </div>
          <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-sm font-medium text-gray-700">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Available Words */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2>Available Words</h2>
          <Badge className="badge badge-secondary">
            {remainingWords.length} remaining
          </Badge>
        </div>

        <Card className="p-6">
          {remainingWords.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-12 h-12 mx-auto text-green-500 mb-3" />
              <p className="text-lg font-medium text-green-600">
                All words categorized!
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Click "Submit" to finish
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {remainingWords.map((word) => (
                <button
                  key={word}
                  onClick={() => setSelectedWord(word)}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    selectedWord === word
                      ? "bg-blue-500 text-white border-blue-600 shadow-lg scale-105 ring-2 ring-blue-300"
                      : "bg-white border-gray-300 hover:border-blue-400 hover:shadow-md active:scale-95"
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Selection Indicator */}
      {selectedWord && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl shadow-sm">
            <span className="text-sm font-medium text-gray-600">Selected:</span>
            <span className="text-lg font-bold text-blue-600">
              {selectedWord}
            </span>
            <button
              onClick={() => setSelectedWord(null)}
              className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Deselect"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Categories */}
      <div>
        <h2 className="mb-3">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryTitles.map((category) => (
            <Card
              key={category}
              className={`overflow-hidden transition-all ${
                selectedWord
                  ? "cursor-pointer hover:shadow-xl hover:border-blue-400 hover:scale-102"
                  : ""
              }`}
              onClick={() => selectedWord && assignWordToCategory(category)}
            >
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-5 py-3 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg">{category}</h3>
                  <Badge>{assignments[category].length}</Badge>
                </div>
              </div>

              <div className="p-5 min-h-[150px]">
                {assignments[category].length === 0 ? (
                  <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg py-8">
                    <p className="text-gray-400 text-sm">
                      {selectedWord ? "Click to add here" : "No words yet"}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {assignments[category].map((word) => (
                      <div
                        key={word}
                        className="group relative inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg shadow-sm"
                      >
                        <span className="text-sm font-medium">{word}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeWordFromCategory(category, word);
                          }}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                          aria-label="Remove"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center pt-4 border-t">
        <Button onClick={resetAll} variant="outline" size="lg">
          Reset All
        </Button>
        <Button onClick={submitResults} size="lg" className="min-w-[140px]">
          Submit
        </Button>
      </div>
    </div>
  );
}
