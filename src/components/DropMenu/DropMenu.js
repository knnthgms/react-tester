import React from "react";
import "./DropMenu.scss";

const options = [
  { key: 1, value: "Display the animals of a specific type" },
  { key: 2, value: "Display the animals ordered by age" },
  {
    key: 3,
    value: "Display the average age of all animals of a specific type"
  },
  { key: 4, value: 'Display the sum all of the dogs ages in "human years"' }
];

const DropMenu = () => {
  return (
    <div>
      <select className="option-selection">
        {options.map(option => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropMenu;
