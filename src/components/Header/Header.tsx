import React from "react";
import { ReactNode } from "react";
// @ts-ignore
import logo from "../../assets/images/icon.png";

export type HeaderProps = {
  children: ReactNode;
  variant: "game" | "menu";
};

const Header = ({ children, variant }: HeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center bg-indigo-900 text-white min-h-20 h-24 px-4">
      <div>
        <img className="object-scale-down h-16 w-16 " src={logo} alt="Logo" />
      </div>
      {children}
      <button>MENU</button>
    </div>
  );
};

export default Header;
