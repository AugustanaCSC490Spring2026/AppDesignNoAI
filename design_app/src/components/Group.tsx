import { useState } from "react";

interface GroupProps {
  index: number;
  correct: string[];
  w2A: string[];
  onClick: (item: string) => void;
}

function Group({ correct, index, w2A, onClick }: GroupProps) {
  const [list, setList] = useState<string[]>(w2A);
  const [state, setState] = useState(0);

  const handleName = (item: string) => {
    if (item === "Click here to add") {
      return "list-group-item list-group-item-secondary";
    } else if (correct.includes(item)) {
      return "list-group-item list-group-item-success";
    } else {
      return "list-group-item list-group-item-danger";
    }
  };

  return (
    <>
      <div>
        <h1>Words with {index} repeated letters</h1>
        <ul
          className="list-group"
          onClick={() => {
            setList(w2A);
            setState(state + 1);
          }}
          onDoubleClick={() => {
            const temp = list.filter(
              (word) => correct.includes(word) || word === "Click here to add",
            );
            setList(temp); // not updating list, state is getting updated on first click i think
            setState(state + 1);
          }}
        >
          {list.map((item, index) => (
            <li
              className={handleName(item)}
              key={index}
              onClick={() => {
                onClick(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
//the choices from our group list should be added to these, each element should change if correct/wrong
// so basically we need onClick to add the item to list, update holding component to green/red
// items also need to be removeable, should still take incorrect answer into account for score (maybe a remove/add button for each group?)

export default Group;
