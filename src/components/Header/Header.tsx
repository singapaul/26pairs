import React from "react";
import { ReactNode } from "react";
import AboutPopup from "../AboutPopup";
import SettingsPopup from "../SettingsPopup";
import StatsPopup from "../StatsPopup";

export type HeaderProps = {
  children?: ReactNode;
  variant?: "game" | "menu";
  restart?: any;
  navbarOpen?: any;
  setNavbarOpen?: any;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="w-full border-b-2 border-white flex justify-between">
      {/* <nav className="flex justify-between w-full"> */}
      <div className="flex items-center">
        {/* <IoIosSettings /> */}
        <p className="text-xl">26Pairs</p>
      </div>
      {children}
      <div className="flex items-center">
        <AboutPopup />
        <StatsPopup />
        <SettingsPopup />
      </div>
      {/* </nav> */}
    </header>
  );
};

export default Header;
