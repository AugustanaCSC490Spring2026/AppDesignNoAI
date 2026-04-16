import React from "react";
import { useState } from "react";

interface GroupProps {
  catTitle: string;
  w2A: string[];
  onClick: (item: string) => void;
  onClick2: (item: string) => void;
}

function Group({ catTitle, w2A, onClick, onClick2 }: GroupProps) {
  const w2ARef = React.useRef(w2A);
  const [list, setList] = useState<string[]>(w2ARef.current);
  let db = false;

  const handleName = (item: string) => {
    if (item === "Click here to add") {
      return "list-group-item list-group-item-secondary";
    } else {
      return "list-group-item";
    }
  };

  return (
    <>
      <div>
        <h1>{catTitle}</h1>
        <ul className="list-group">
          {list.map((item, index) => (
            <li
              className={handleName(item)}
              key={index}
              onClick={() => {
                setTimeout(() => {
                  if (!db) {
                    onClick(item);
                  }
                }, 200);
                db = false;
              }}
              onDoubleClick={() => {
                db = true;
                if (item != "Click here to add") {
                  onClick2(item);
                }
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
