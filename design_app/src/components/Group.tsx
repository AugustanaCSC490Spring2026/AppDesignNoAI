import { ReactNode } from "react";
import { useState } from "react";

interface GroupProps {
  index: number;
  correct: string[];
  onClick: (item: string) => void;
}

function Group({ correct, index, onClick }: GroupProps) {
  const [list, setList] = useState<string[]>([""]);

  //updates list being displayed in group
  const handleClick = (words: number, item: string) => {
    const newList = [...list];
    newList.push(item);
    setList(newList);
  };

  return (
    <>
      <div>
        <h1>Words with {index} repeated letters</h1>
        <ul className="list-group">
          {list.map((item, index) => (
            <li
              className="list-group-item"
              key={item}
              onClick={() => {
                handleClick(index, item);
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
