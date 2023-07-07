import React from "react";
import { useState, useRef } from "react";
import { IoIosStats } from "react-icons/io";

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

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button className="p-2 rounded-full" onClick={toggleMenu}>
          <p className="text-4xl">
            <IoIosStats />
          </p>
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* The overlay */}
            <div
              onClick={toggleMenu}
              className="fixed inset-0 bg-black opacity-50"
            ></div>
            {/* The menu */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-48 py-2 rounded-md shadow-lg transition-transform duration-300">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                  Stats stuff
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                  Option 2
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                  Option 3
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StatsPopup;
