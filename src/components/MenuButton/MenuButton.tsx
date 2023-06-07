import React from "react";
// @ts-ignore
import { uniqueElementsArray } from "../../data/Simpsons";

export type MenuButtonProps = {
  icon?: any;
  title: string;
  subtitle: string;
  selected?: boolean;
  handleClick?: any;
};

const card = uniqueElementsArray[0];

const MenuButton = ({
  icon,
  title,
  subtitle,
  handleClick,
  selected,
}: MenuButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`flex w-full flex-row justify-between  ${
        selected ? "bg-green-200" : ""
      }`}
    >
      <span className="flex">
        <img src={card.image} className="picture-front" alt="pokeball" />
        <span className="pl-32">
          <h3 className="text-lg">{subtitle}</h3>
          <p className="text-4xl">{title}</p>
        </span>
      </span>
      <svg
        className={"h-4 w-4 transition-transform"}
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
  );
};

export default MenuButton;
