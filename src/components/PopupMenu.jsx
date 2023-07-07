import React, { useState } from "react";

const PopupMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-full"
        onClick={toggleMenu}
      >
        Menu
      </button>

      {isOpen && (
        <div className="absolute bottom-0 right-0 w-48 bg-white shadow-lg rounded-md transform translate-y-full transition-transform duration-300">
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
      )}
    </div>
  );
};

export default PopupMenu;
