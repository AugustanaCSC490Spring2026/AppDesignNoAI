import { useState } from "react";
import "./App.css";
import SuperComp from "./components/SuperComp";

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
  const [useAI, setUseAI] = useState(0);
  //change to false to use human UI
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

  const categoryTitles = [
    "2 Repeated Letters",
    "3 Repeated Letters",
    "4+ Repeated Letters",
  ];
  const id = 10;

  async function handleFinishedGrouping(groupedResults: string[][]) {
    const score = handleScore(groupedResults, correct);
    const total = correct.reduce((acc, grp) => acc + grp.length, 0);
    const time = handleTime(Date.now());
    setUseAI(useAI + 1);
    alert(`Score: ${score}/${total}\nTime: ${time}\nID#: ${id}`);

    // Send results to backend
    const results = {
      id: id,
      mode: useAI === 0 ? "AI" : "Human",
      score: `${score}/${total}`,
      time: time,
    };

    try {
      const response = await fetch("http://localhost:3001/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(results),
      });

      if (response.ok) {
        console.log("Success: Recorded to CSV");
      } else {
        console.error("Server Error:", response.statusText);
      }
    } catch (error) {
      console.error("Connection Error:", error);
    }
  }

  return (
    <SuperComp
      useAI={useAI}
      id={id}
      wordList={words}
      categoryTitles={categoryTitles}
      onFinishedCallback={handleFinishedGrouping}
    />
  );
}

export default App;
