import React from "react";
import { useState, useRef } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import PopupContent from "../PopupContent";

export type AboutPopupProps = {
  show?: boolean;
  onClose?: () => void;
};

const AboutPopup = ({ show, onClose }: AboutPopupProps) => {
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
            <AiOutlineQuestionCircle />
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

            <PopupContent title={"About"} onClose={toggleMenu}>
              <p>
                Match all of the pairs as fast as you can to win the game.
                Complete the game in as short a time and in as few moves as
                possible.
              </p>
              <br />
              <p className="border-b-2 borer-white">
                Click on an a card to reveal the other side. Share your results
                and beat your friends!{" "}
              </p>
              <p className="text-xs text-neutral-500 pt-1">2023 26Pairs ltd</p>
            </PopupContent>
          </div>
        )}
      </div>
    </>
  );
};

export default AboutPopup;
