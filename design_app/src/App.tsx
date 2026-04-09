import React from "react";
import Group from "./components/Group";
import GroupList from "./components/GroupList";
import { useState } from "react";

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
  const words2Add = [
    ["Click here to add"],
    ["Click here to add"],
    ["Click here to add"],
  ];
  const correct = [
    ["green", "seen", "greet", "color", "tense", "manas", "apple"],
    ["assumes", "irreverent", "raspberry", "delete"],
    ["assess"],
  ];
  let globIt = "";

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <GroupList
            items={words}
            heading="Word List"
            onSelectItem={(item) => {
              globIt = item;
            }}
          />
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
                  words[words.indexOf(globIt)] = " ";
                }
                if (!words2Add[i].includes(globIt)) {
                  words2Add[i].push(globIt);
                }
              }}
            />
          </div>
        ))}
        {/* <QuizQuestions action={(item) => console.log(item)} /> */}
      </div>
    </div>
  );
}

export default App;
