import React, { ReactNode } from "react";
import Accordian from "../Accordian/Accordian";

export type SidemenuProps = {
  children?: ReactNode;
  showSidebar?: boolean;
  onClickHandler?: () => void;
  deckLinks: any;
};
function Sidemenu({
  children,
  onClickHandler,
  showSidebar,
  deckLinks,
}: SidemenuProps) {
  console.log("sidemenu");

  return (
    <div
      className={`top-0 left-0 w-[80vw] sm:w-[35vw] bg-gray-500 p-10 pr-20 text-white fixed h-full z-40 ease-in-out duration-300 ${
        showSidebar ? "translate-x-0 " : "-translate-x-full"
      }`}
    >
      <Accordian deckLinks={deckLinks} />
      <button onClick={onClickHandler}>Press Me </button>
    </div>
  );
}

export default Sidemenu;
