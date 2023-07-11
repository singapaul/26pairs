import React from "react";
import { useState } from "react";

export type ListItemProps = {
  variant: "toggle" | "link" | "stat";
  title: string;
  subtitle?: string;
  onToggle?: () => void;
  linkText?: string;
  link?: string;
  stat?: string | number | null;
};

const ToggleElement = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <>
      <div className="relative flex flex-col items-center justify-center overflow-hidden">
        <div className="flex">
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={enabled}
              readOnly
            />
            <div
              onClick={() => {
                setEnabled(!enabled);
              }}
              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
          </label>
        </div>
      </div>
    </>
  );
};

const ListItem = ({
  variant,
  title,
  subtitle,
  onToggle,
  stat,
  linkText,
  link,
}: ListItemProps) => {
  return (
    <li className="py-1 border-b-2 borer-white">
      <div className="flex justify-between items-center">
        <span>
          <h3 className="text-lg">{title}</h3>
          {subtitle && <p className="text-xs text-neutral-500">{subtitle}</p>}
        </span>
        {variant == "toggle" ? (
          <ToggleElement />
        ) : variant == "link" ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {linkText}
          </a>
        ) : (
          <p>{stat}</p>
        )}
      </div>
    </li>
  );
};

export default ListItem;
