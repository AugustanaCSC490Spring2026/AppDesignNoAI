import React from "react";
import Group from "./components/Group";
import WordDisplay from "./components/WordDisplay";
import { useState } from "react";
import "./App.css";

const handleTime = (time: number) => {
  let temp = "";
  time = time / 1000;
  if (time >= 60) {
    temp += Math.floor(time / 60) + "m ";
  }
  temp += (time % 60).toFixed(1) + "s";
  return temp;
};

function App() {
  const words = [
    "green",
    "seen",
    "greet",
    "color",
    "tense",
    "manas",
    "assumes",
    "apple",
    "irreverent",
    "assess",
    "raspberry",
    "delete",
  ];
  const [words2Add, setWords2Add] = useState([
    ["Click here to add"],
    ["Click here to add"],
    ["Click here to add"],
  ]);
  const [correct, setCorrect] = useState([
    ["green", "seen", "greet", "color", "tense", "manas", "apple", "raspberry"],
    ["assumes", "irreverent", "delete"],
    ["assess"],
  ]);
  const [state, setState] = useState(0);
  const [index, setIndex] = useState(0);
  let globIt = words[index];
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(Date.now());

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
    <div className="container">
      <div className="row">
        <div className="col">
          {!done ? (
            <WordDisplay
              wordList={words}
              onClick={(adjust) => {
                setIndex(index + adjust);
                if (index === words.length) {
                  let temp = Date.now();
                  setTime(temp - time);
                  setDone(true);
                }
              }}
            />
          ) : (
            <>
              <h1 style={{ textAlign: "center" }}>
                Your final score is {score}/{words.length}
              </h1>
              <p style={{ textAlign: "center" }}>
                Time taken: {handleTime(time)}
              </p>
            </>
          )}
        </div>
        {Array.from({ length: 3 }, (_, i) => (
          <div className="col">
            <Group
              correct={correct[i]}
              index={i + 2}
              w2A={words2Add[i]}
              onClick={() => {
                if (correct[i].includes(globIt)) {
                  // if its not correct, word stays in listgroup
                  setScore(score + 1);
                  correct[i].splice(correct[i].indexOf(globIt), 1);
                  setCorrect([...correct]);
                  setState(state + 1);
                }
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
export default App;
