import React from "react";
import { useState, useRef } from "react";
import { IoIosStats } from "react-icons/io";
import ListItem from "../ListItem";
import PopupContent from "../PopupContent";

export type StatsPopupProps = {
  show?: boolean;
  onClose?: () => void;
};

const StatsPopup = ({ show, onClose }: StatsPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // get the values from local storage

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button className="p-2 rounded-full" onClick={toggleMenu}>
          <p className="text-4xl">
            <IoIosStats />
          </p>
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
            {/* The overlay */}
            <div
              onClick={toggleMenu}
              className="fixed inset-0 bg-black opacity-50"
            ></div>
            {/* The menu */}
            <PopupContent title={"Stats"} onClose={toggleMenu}>
              <ul className="">
                <ListItem variant={"stat"} title={"Best Moves"} stat={localStorage.getItem("bestMoves") || 0} />
                <ListItem variant={"stat"} title={"Best Time"} stat={"10:13"} />
                <ListItem variant={"stat"} title={"Games Played"} stat={43} />
                <ListItem
                  variant={"stat"}
                  title={"Average time"}
                  stat={"18:03"}
                />
                <ListItem variant={"stat"} title={"Average moves"} stat={56} />
                <li className="text-xs text-neutral-500 pt-1">
                  2023 26Pairs ltd
                </li>
              </ul>
            </PopupContent>
          </div>
        )}
      </div>
    </>
  );
};

export default StatsPopup;
