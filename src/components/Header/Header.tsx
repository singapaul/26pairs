import React from "react";
import { ReactNode } from "react";
// @ts-ignore
import logo from "../../assets/images/icon.png";

export type HeaderProps = {
  children: ReactNode;
  variant: "game" | "menu";
  restart: any;
  navbarOpen?: any;
  setNavbarOpen?: any;
};

const Header = ({ children, restart, variant, setNavbarOpen }: HeaderProps) => {
  if (variant === "game") {
    return (
      <div className="w-full flex justify-between items-center bg-indigo-900 text-white min-h-20 h-24 px-4">
        <div>
          <img className="object-scale-down h-16 w-16 " src={logo} alt="Logo" />
        </div>
        {children}
        <div className="flex gap-4">
          <button
            className="bg-red-500 p-3 border-4 border-black"
            onClick={() => restart()}
          >
            Restart
          </button>
        </div>
      </div>
    );
  } else if (variant === "menu") {
    return (
      <div className="w-full flex justify-between items-center bg-indigo-900 text-white min-h-20 h-24 px-4">
        <div>
          <img className="object-scale-down h-16 w-16 " src={logo} alt="Logo" />
        </div>
        {children}
        <div className="flex gap-4">
          <button
            className="bg-purple-500 p-3 border-4 border-black"
            onClick={setNavbarOpen}
          >
            Close
          </button>
        </div>
      </div>
    );
  } else {
    return <div>error</div>;
  }
};

export default Header;
