import { useState } from "react";
import type { ReactNode } from "react";

//interface QuizQuestion {

function QuizQuestions() {
  //Note: these all correspond via list index
  //questions to choose from for quiz
  const questions = ["What is 2+2?"];
  // list of list of options for each question
  const options = [["1", "2", "3", "4"]];
  //correct answer index within list in list above
  const correctKey = [3];
  const [selectedIndex, setSelectedIndex] = useState(-1);
  let currentQIndex = 0;

  const checkQuestion = (index: number) => {
    if (index === correctKey[currentQIndex]) {
      setSelectedIndex(index);
    }
  };

  return (
    <>
      <div>
        <h1>Quiz Question # {currentQIndex + 1}</h1>
        {questions.map((question, index) => (
          <div key={index}>
            <p>{question}</p>
            <ol className="list-group">
              {options[index].map((option, optionIndex) => (
                <li
                  key={option}
                  className="list-group-item"
                  onClick={() => setSelectedIndex(optionIndex)}
                >
                  <button
                    className={
                      selectedIndex === 3 ? "btn btn-success" : "btn btn-danger"
                    }
                    key={option}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </>
  );
}

export default QuizQuestions;
