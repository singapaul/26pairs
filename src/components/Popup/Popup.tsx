import React from "react";
import { useState, useEffect, useRef } from "react";
// @ts-ignore

export type PopupProps = {
  show?: boolean;
  onClose?: () => void;
};

const Popup = ({ show, onClose }: PopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="overlay bg-black opacity-80 absolute inset-0"></div>
        <div className="w-full dialog opacity-95 bg-white p-6 rounded-lg border-2 border-black">
          <div className="content">
            <p className="text-gray-800">
              This is the text content of the popup.
            </p>
          </div>
          <button
            className="close-button bg-gray-200 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div> */}

      <div className="relative" ref={menuRef}>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full"
          onClick={toggleMenu}
        >
          Menu
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* The overlay */}
            <div onClick={toggleMenu} className="fixed inset-0 bg-black opacity-50"></div>

            {/* The menu */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-48 py-2 rounded-md shadow-lg transition-transform duration-300">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                  Option 1
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

export default Popup;
