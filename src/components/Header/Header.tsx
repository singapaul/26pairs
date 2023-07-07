import React from "react";
import { ReactNode } from "react";
// @ts-ignore
import logo from "../../assets/images/icon.png";
import AboutPopup from "../AboutPopup";
import MenuButton from "../MenuButton";

export type HeaderProps = {
  children?: ReactNode;
  variant?: "game" | "menu";
  restart?: any;
  navbarOpen?: any;
  setNavbarOpen?: any;
};

const Header = ({ children, restart, variant, setNavbarOpen }: HeaderProps) => {
  return (
    <header className="border-2 border-rose-500 w-full">
      <nav className="flex justify-between w-full">
        <div className="flex items-center">
          <p>E</p>
          <img alt="icon" src={logo} className="w-4 h-4" />
        </div>
        {children}
        <div className="flex items-center">
          <AboutPopup />
          <p>B</p>
          <p>C</p>
        </div>
        {/* Accordian and logo */}
        {/* Timer */}
        {/* pop up icons settings, about and stats */}
      </nav>
    </header>
  );
};

export default Header;
