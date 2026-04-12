import { useState } from "react";
import { useEffect } from "react";

interface WordDisplayProps {
  wordList: string[];
  score: number;
  onClick: (adjust: number) => void;
}

function WordDisplay({ wordList, score, onClick }: WordDisplayProps) {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState(0);

  const handle = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        setIndex(index - 1);
      } else if (e.key === "ArrowRight") {
        setIndex(index + 1);
      }
    });
  };

  return (
    //instead of null in if below, have it display
    <>
      <div>
        <h1>Please put this word in the correct category:</h1>
        <hr />
        <h2 style={{ textAlign: "center" }}>
          {index < wordList.length
            ? wordList[index]
            : "Are you satisfied with your answers? This is your last chance to change them!"}
        </h2>
        <hr />
        <div className="row">
          <div className="col" style={{ alignSelf: "left" }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                if (index > 0) {
                  setIndex(index - 1);
                  setState(state + 1);
                  onClick(-1);
                }
              }}
            >
              Previous Word
            </button>
          </div>
          <div className="col" style={{ alignSelf: "right" }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setIndex(index + 1);
                onClick(1);
              }}
            >
              Next Word
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WordDisplay;
