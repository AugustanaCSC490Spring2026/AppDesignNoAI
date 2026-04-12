import { useState } from "react";

interface LGProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: LGProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleName = (index: number, item: string) => {
    if (item === " ") {
      return "list-group-item disabled";
    } else if (index === selectedIndex) {
      //maybe good idea to auto deselect after click
      return "list-group-item active";
    } else {
      return "list-group-item";
    }
  };

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group list-group-flush">
        {items.map((item, index) => (
          <li
            className={handleName(index, item)}
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
