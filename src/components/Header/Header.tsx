import React from "react";
import { ReactNode } from "react";

export type HeaderProps = {
  children: ReactNode;
  variant: "game" | "menu";
};

const Header = ({ children, variant }: HeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center bg-sky-500 text-white min-h-20 h-24">
      {children}
    </div>
  );
};

export default Header;
