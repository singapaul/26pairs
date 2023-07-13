import React from "react";
import { useState, useRef } from "react";
import { IoIosSettings } from "react-icons/io";
import ListItem from "../ListItem";
import PopupContent from "../PopupContent";

export type SettingsPopupProps = {
  show?: boolean;
  onClose?: () => void;
};

const SettingsPopup = ({ show, onClose }: SettingsPopupProps) => {
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
            <IoIosSettings />
          </p>
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
            {/* The overlay */}
            <div
              onClick={toggleMenu}
              className="fixed inset-0 bg-black opacity-50 w-full"
            ></div>
            {/* The menu */}
            <PopupContent title={"Settings"} onClose={toggleMenu}>
              <ul className="">
                <ListItem
                  variant={"toggle"}
                  title={"Easy Mode"}
                  subtitle={"Reduce the number of cards to 11 pairs"}
                />
                <ListItem variant={"darkToggle"} title={"Dark Mode"} />
                <ListItem
                  variant={"link"}
                  title={"Contact"}
                  subtitle={"Send Feedback"}
                  link="mailto:26Pairs@gmail.com"
                  linkText="Email"
                />
                <ListItem
                  variant={"link"}
                  title={"Community"}
                  subtitle={"Follow for updates"}
                  link="https://www.twitter.com"
                  linkText="Twitter"
                />
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

export default SettingsPopup;
