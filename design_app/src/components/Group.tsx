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

export default Group;
