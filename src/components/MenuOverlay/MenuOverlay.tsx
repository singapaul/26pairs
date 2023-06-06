import React from "react";
import Accordian from "../Accordian";
import Header from "../Header";

export type MenuOverlayProps = {
  props?: any;
  navbarOpen: any;
  setNavbarOpen: any;
  children?: any;
};

const MenuOverlay = ({ navbarOpen, setNavbarOpen }: MenuOverlayProps) => {
  return (
    <nav
      className={`fixed flex flex-col top-0 left-0 w-full z-10 h-screen  bg-red-900 transform delay-100 transition-all duration-300 ${
        navbarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      }`}
    >
      <Header
        children={undefined}
        variant={"menu"}
        restart={undefined}
        navbarOpen={navbarOpen}
        setNavbarOpen={() => setNavbarOpen(!navbarOpen)}
      />
      <Accordian />
      {/* <ul className="w-full flex flex-col items-start text-white">
        <li className="flex  w-full leading-8 list-none focus:outline-none group py-2 tracking-normal opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out">
          <a
            href="/"
            className="h-full w-full py-2 text-lg text-white;"
            onClick={() => {
              setNavbarOpen(false);
            }}
          >
            Temp filler content
          </a>
        </li>
        <li className="flex w-full leading-8 list-none focus:outline-none group py-2 tracking-normal opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out">
          <a
            href="/"
            className="h-full w-full py-2 text-lg text-white;"
            onClick={() => {
              setNavbarOpen(false);
            }}
          >
            Temp filler content
          </a>
        </li>
        <li className="flex w-full leading-8 list-none focus:outline-none group py-2 tracking-normal opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out">
          <a
            href="/"
            className="h-full w-full py-2 text-lg text-white;"
            onClick={() => {
              setNavbarOpen(false);
            }}
          >
            Temp filler content
          </a>
        </li>
      </ul> */}
    </nav>
  );
};

export default MenuOverlay;
