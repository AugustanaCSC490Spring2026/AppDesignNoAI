import React from "react";
import Group from "./components/Group";
import GroupList from "./components/GroupList";

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
            heading="Movies"
            onSelectItem={(item) => {
              console.log(item);
              globIt = item;
            }}
          />
        </div>
        {Array.from({ length: 3 }, (_, i) => (
          <div className="col">
            <Group
              correct={correct[i]}
              index={i + 2}
              onClick={() => {
                words[words.indexOf(globIt)] += "*";
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
