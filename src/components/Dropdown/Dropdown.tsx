import React, { useState } from "react";
import MenuButton from "../MenuButton";

export type DropdownProps = {
  title?: any;
  buttonArray?: any;
};

const Dropdown = ({ title, buttonArray }: DropdownProps) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const toggleAccordion = () => {
    setExpanded(!expanded);
    setSelectedButton(null);
  };

  const handleButtonClick = (button: any) => {
    setSelectedButton(button);
    console.log(selectedButton);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="w-full bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <span className="mr-2">{title}</span>
        <svg
          className={`h-4 w-4 transition-transform ${
            expanded ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M0 0h20v20H0z" fill="none" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.5 8l4 4 4-4H6.5z"
            fill="currentColor"
          />
        </svg>
      </button>
      {expanded && (
        <div className="overflow-hidden transition-max-height ease-in-out duration-300">
          <ul className="bg-white rounded-md mt-2">
            {buttonArray.map((val: any) => {
              return (
                <li key={val.title} onClick={() => handleButtonClick(val)}>
                  <MenuButton
                    selected={selectedButton === val}
                    title={val.title}
                    subtitle={val.subtitle}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
