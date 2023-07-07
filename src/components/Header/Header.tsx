import React from "react";
import { ReactNode } from "react";
// @ts-ignore
import logo from "../../assets/images/icon.png";
import AboutPopup from "../AboutPopup";
import SettingsPopup from "../SettingsPopup";
import StatsPopup from "../StatsPopup";
import { IoIosSettings } from "react-icons/io";

export type HeaderProps = {
  children?: ReactNode;
  variant?: "game" | "menu";
  restart?: any;
  navbarOpen?: any;
  setNavbarOpen?: any;
};

const Header = ({ children, restart, variant, setNavbarOpen }: HeaderProps) => {
  return (
    <header className="w-full border-b-2 border-white">
      <nav className="flex justify-between w-full">
        <div className="flex items-center">
          <IoIosSettings />
          <p className="text-md">
            <img alt="icon" src={logo} className="w-16 h-16" />
          </p>
        </div>
        {children}
        <div className="flex items-center">
          <AboutPopup />
          <StatsPopup />
          <SettingsPopup />
        </div>
      </nav>
    </header>
  );
};

export default Header;
