import React, { useEffect } from "react";
import Group from "./components/Group";
import WordDisplay from "./components/WordDisplay";
import { useState } from "react";
import "./App.css";
import HumanGrouperUI from "./components/HumanGrouperUI";
import AIGrouperUI from "./components/AIGrouperUI";

const start = Date.now();
const handleTime = (time: number) => {
  time -= start;
  let temp = "";
  time = time / 1000;
  if (time >= 60) {
    temp += Math.floor(time / 60) + "m ";
  }
  temp += (time % 60).toFixed(1) + "s";
  return temp;
};

const handleScore = (words: string[][], correct: string[][]): number => {
  let score = 0;
  for (let i = 0; i < correct.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      if (correct[i].includes(words[i][j])) {
        score++;
      }
    }
  }
  return score;
};

function App() {
  const useAI = true;
  const [correct, setCorrect] = useState([
    ["green", "seen", "greet", "color", "tense", "manas", "apple"],
    ["assumes", "irreverent", "delete", "raspberry"],
    ["assess"],
  ]);
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

  function handleFinishedGrouping(groupedResults: string[][]): void {
    const score = handleScore(groupedResults, correct);
    const total = correct.reduce((acc, grp) => acc + grp.length, 0);
    const time = handleTime(Date.now());
    alert(`Score: ${score}/${total}\nTime: ${time}`);
  }
  return (
  <>
  {useAI ? (
    <AIGrouperUI />
  ) : (
    <HumanGrouperUI
      wordList={words}
      categoryTitles={[
        "2 Repeated Letters",
        "3 Repeated Letters",
        "4+ Repeated Letters",
      ]}
      onFinishedCallback={handleFinishedGrouping}
    />
  )}
</>);
}

export default App;
