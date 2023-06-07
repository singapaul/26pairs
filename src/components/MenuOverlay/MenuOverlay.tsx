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
    </nav>
  );
};

export default MenuOverlay;
