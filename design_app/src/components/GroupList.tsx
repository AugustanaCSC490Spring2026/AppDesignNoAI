import { useState } from "react";

interface LGProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: LGProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  let placeholder: string[] = [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ];
  let rank: string;

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items found</p>}
      <ol className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
              rank = item;
            }}
          >
            {item}
          </li>
        ))}
      </ol>
      <ol className="list-group">
        {placeholder.map((item, index) => (
          <li className="list-group-item" key={index}>
            {item}
          </li>
        ))}
      </ol>
    </>
  );
}

export default ListGroup;
