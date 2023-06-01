import React from "react";
import { ReactNode } from "react";
// @ts-ignore
import logo from "../../assets/images/icon.png";

export type HeaderProps = {
  children: ReactNode;
  variant: "game" | "menu";
  restart: any;
  navbarOpen: any;
  setNavbarOpen: any;
};

const Header = ({
  children,
  variant,
  restart,
  navbarOpen,
  setNavbarOpen,
}: HeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center bg-indigo-900 text-white min-h-20 h-24 px-4">
      <div>
        <img className="object-scale-down h-16 w-16 " src={logo} alt="Logo" />
      </div>
      {children}
      <div className="flex gap-4">
        <button
          className="flex top-0 right-0 z-20 relative w-10 h-10 text-white focus:outline-none"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <div className="absolute w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <span
              className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${
                navbarOpen ? "rotate-45 delay-200" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 bg-white transform transition-all duration-200 ease-in-out ${
                navbarOpen ? "w-0 opacity-50" : "w-5 delay-200 opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${
                navbarOpen ? "-rotate-45 delay-200" : "translate-y-1.5"
              }`}
            />
          </div>
        </button>
        <button
          className="bg-red-500 p-3 border-4 border-black"
          onClick={() => restart()}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Header;
