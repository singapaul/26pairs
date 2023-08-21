import React, { ReactNode } from "react";
import Accordian from "../Accordian/Accordian";
import { AiOutlineCloseSquare } from "react-icons/ai";

export type SidemenuProps = {
  children?: ReactNode;
  showSidebar?: boolean;
  onClickHandler?: () => void;
  deckLinks: any;
};
function Sidemenu({ onClickHandler, showSidebar, deckLinks }: SidemenuProps) {
  return (
    <div
      className={`flex flex-col top-0 left-0 w-[80vw] sm:w-[35vw] bg-gray-500 p-10 pr-20 text-white fixed h-full z-40 ease-in-out duration-300 ${
        showSidebar ? "translate-x-0 " : "-translate-x-full"
      }`}
    >
      <button
        onClick={onClickHandler}
        className="self-end pointer hover:text-red-500"
        style={{ fontSize: "30px" }}
      >
        <AiOutlineCloseSquare />
      </button>
      <Accordian deckLinks={deckLinks} />
    </div>
  );
}

export default Sidemenu;
