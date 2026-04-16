import React, { useEffect } from "react";
import { useState } from "react";
import WordDisplay from "./WordDisplay";
import Group from "./Group";

interface HumanGrouperProps {
  wordList: string[];
  categoryTitles: string[];
  onFinishedCallback: (groupedResults: string[][]) => void;
}

function HumanGrouperUI({
  wordList,
  categoryTitles,
  onFinishedCallback,
}: HumanGrouperProps) {
  const [words2Add, setWords2Add] = useState([
    ["Click here to add"],
    ["Click here to add"],
    ["Click here to add"],
  ]);
  const [state, setState] = useState(0);
  const [index, setIndex] = useState(0);
  let globIt = wordList[index];
  const [done, setDone] = useState(false);

  // useEffect(() => {
  //   const handleGlobalKey = (e: KeyboardEvent) => {
  //     if (e.key === "ArrowLeft") {
  //       if (index > 0) {
  //         setIndex(index - 1);
  //       }
  //     } else if (e.key === "ArrowRight") {
  //       setIndex(index + 1);
  //       if (index === words.length) {
  //         setDone(true);
  //       }
  //     }
  //   };
  //   window.addEventListener("keydown", handleGlobalKey);
  //   return () => window.removeEventListener("keydown", handleGlobalKey);
  // }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {!done ? (
            <WordDisplay
              wordList={wordList}
              onClick={(adjust) => {
                setIndex(index + adjust);
                if (index + adjust > wordList.length) {
                  console.log(words2Add);
                  setDone(true);
                  onFinishedCallback(words2Add);
                  setState(state + 1);
                }
              }}
            />
          ) : (
            <>
              <h1>(grouping finished)</h1>
            </>
          )}
        </div>
        {Array.from({ length: 3 }, (_, i) => (
          <div className="col">
            <Group
              catTitle={categoryTitles[i]}
              w2A={words2Add[i]}
              onClick={() => {
                if (!words2Add[i].includes(globIt)) {
                  words2Add[i].push(globIt);
                  setState(state + 1);
                }
              }}
              onClick2={(item) => {
                const index = words2Add[i].indexOf(item);
                words2Add[i].splice(index, 1);
                setState(state + 1);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HumanGrouperUI;
